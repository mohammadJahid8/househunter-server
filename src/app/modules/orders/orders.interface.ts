import { Model, Types } from 'mongoose';
import { ICow } from '../cows/cows.interface';
import { IUser } from '../users/users.interface';

export type IOrder = {
  cow: Types.ObjectId | ICow;
  price: number;
  buyer: Types.ObjectId | IUser;
  seller: Types.ObjectId | IUser;
  orderStatus: string;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
