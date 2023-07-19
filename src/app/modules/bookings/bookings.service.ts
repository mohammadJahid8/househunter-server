import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';

import { House } from '../house/house.model';
import { IBooking } from './bookings.interface';
import { Booking } from './bookings.model';

const createBooking = async (
  HouseId: Types.ObjectId,
  renterEmail: Types.ObjectId,
  renterId: Types.ObjectId
) => {
  const house = await House.findById(HouseId);
  const ownerEmail = house?.owner;
  // const owner = await User.find({
  //   email: ownerEmail,
  // });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedHouse = await House.findByIdAndUpdate(
      HouseId,
      { label: 'booked' },
      { session, new: true }
    );

    const bookingIntent = {
      house: updatedHouse?.id,
      renter: renterEmail,
      renterId: renterId,
      owner: ownerEmail,

      orderStatus: 'success',
    };
    const order = new Booking(bookingIntent);
    await order.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return bookingIntent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getBookings = async (user: JwtPayload | null): Promise<IBooking[]> => {
  const orders = await Booking.find({
    renter: user?.email,
  })
    .populate('house')
    .populate('renterId');
  return orders;
};
const getSingleBooking = async (id: string) => {
  const singleOrder = await Booking.findById(id)
    .populate('house')
    .populate('renterId');

  return singleOrder;
};

const deleteBookings = async (id: string) => {
  const deletedBooking = await Booking.findById(id);

  console.log(deletedBooking);

  const updatedHouse = await House.findOneAndUpdate(
    {
      _id: deletedBooking?.house,
    },
    {
      label: 'for rent',
    },
    { new: true }
  );

  if (updatedHouse) {
    await Booking.findByIdAndDelete(id);
  }

  // console.log(updatedHouse);

  // Delete booking by id
  // const deletedBooking = await Booking.findByIdAndDelete(id);

  // console.log(deletedBooking);
};

export const OrdersService = {
  createBooking,
  getBookings,
  getSingleBooking,
  deleteBookings,
};
