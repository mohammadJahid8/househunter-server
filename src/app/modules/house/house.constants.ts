import { IHouseLabel } from './house.interface';

export const houseLabel: IHouseLabel[] = ['for rent', 'booked'];

export const HouseSearchableFields = ['city', 'name', 'address'];

export const HouseFilterableFields = [
  'searchterm',
  'address',
  'minprice',
  'maxprice',
];
