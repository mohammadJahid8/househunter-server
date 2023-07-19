import { Schema, model } from 'mongoose';
import { BookingModel, IBooking } from './bookings.interface';

const OrderSchema = new Schema<IBooking>(
  {
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House',
    },

    renter: {
      type: String,
      ref: 'User',
    },
    owner: {
      type: String,
      ref: 'User',
    },

    orderStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', OrderSchema);
