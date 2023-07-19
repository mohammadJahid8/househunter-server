import { Model } from 'mongoose';
import { IUser } from '../users/users.interface';

export type IHouseLabel = 'booked' | 'for rent';

export type IHouse = {
  name: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  roomSize: number;
  picture: string;
  availabilityDate: string;
  rentPerMonth: number;
  phoneNumber: string;
  description: string;
  label: IHouseLabel;
  owner: string | IUser;
};

export type HouseModel = Model<IHouse, Record<string, unknown>>;

export type IHouseFilters = {
  searchterm?: string;

  minprice?: number;
  maxprice?: number;
};
