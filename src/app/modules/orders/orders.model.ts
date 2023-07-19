import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './orders.interface';

const OrderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
    },
    price: {
      type: Number,
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    seller: {
      type: Schema.Types.ObjectId,
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

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);
