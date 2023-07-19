import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';

import { House } from '../house/house.model';
import { IBooking } from './bookings.interface';
import { Booking } from './bookings.model';

const createBooking = async (
  HouseId: Types.ObjectId,
  renterEmail: Types.ObjectId
) => {
  // const renter = await User.find({
  //   email: renterEmail,
  // });
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
  let query = {};
  if (user?.role === 'admin') {
    query = {};
  } else if (user?.role === 'buyer') {
    query = { buyer: user?.id };
  } else if (user?.role === 'owner') {
    query = { owner: user?.id };
  }

  const orders = await Booking.find(query);
  return orders;
};
const getSingleBooking = async (id: string) => {
  const singleOrder = await Booking.findById(id)
    .populate('house')
    .populate('renter');

  return singleOrder;
};

export const OrdersService = {
  createBooking,
  getBookings,
  getSingleBooking,
};
