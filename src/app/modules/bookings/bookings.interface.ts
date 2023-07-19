import { Model, Types } from 'mongoose';

import { IHouse } from '../house/house.interface';
import { IUser } from '../users/users.interface';

export type IBooking = {
  house: Types.ObjectId | IHouse;

  renter: string | IUser;
  owner: string | IUser;
  orderStatus: string;
};

export type BookingModel = Model<IBooking, Record<string, unknown>>;
