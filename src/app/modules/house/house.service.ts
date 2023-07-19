/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { PaginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { JwtPayload } from 'jsonwebtoken';
import { HouseSearchableFields } from './house.constants';
import { IHouse, IHouseFilters } from './house.interface';
import { House } from './house.model';

const createHouse = async (authUser: IHouse): Promise<IHouse | null> => {
  const result = await House.create(authUser);
  return result;
};

const getAllHouses = async (
  filters: IHouseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IHouse[]>> => {
  const { searchterm } = filters;
  const { page, limit, skip, sortby, sortorder } =
    PaginationHelper.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchterm) {
    andCondition.push({
      $or: HouseSearchableFields.map(field => ({
        [field]: {
          $regex: searchterm,
          $options: 'i',
        },
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortby && sortorder) {
    sortCondition[sortby] = sortorder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const total = await House.countDocuments(whereCondition);

  const result = await House.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit || total);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleHouse = async (id: string): Promise<IHouse | null> => {
  const result = await House.findById(id);

  return result;
};

const getHouseByToken = async (user: JwtPayload): Promise<IHouse[]> => {
  const email = user.email;

  const result = await House.find({
    owner: email,
  });

  return result;
};

const updateHouse = async (
  id: string,
  payload: Partial<IHouse>
): Promise<IHouse | null> => {
  const isExist = await House.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const updateHouseData: Partial<IHouse> = payload;

  const result = await House.findOneAndUpdate(
    {
      _id: id,
    },
    updateHouseData,
    {
      new: true,
    }
  );

  return result;
};

const deleteHouse = async (id: string): Promise<IHouse | null> => {
  const result = await House.findByIdAndDelete(id);

  return result;
};

export const HouseService = {
  createHouse,
  getAllHouses,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  getHouseByToken,
};
