import { Schema, model } from 'mongoose';
import { houseLabel } from './house.constants';
import { HouseModel, IHouse } from './house.interface';

const CowModel = new Schema<IHouse>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    availabilityDate: {
      type: String,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    roomSize: {
      type: Number,
      required: true,
    },
    rentPerMonth: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: houseLabel,
    },

    owner: {
      type: String,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const House = model<IHouse, HouseModel>('House', CowModel);
