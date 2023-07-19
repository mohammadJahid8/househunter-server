import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';

import { IHouse } from './house.interface';
import { HouseService } from './house.service';

const createHouse = catchAsync(async (req: Request, res: Response) => {
  const result = await HouseService.createHouse(req.body);

  sendResponse<IHouse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House created successfully',
    data: result,
  });
});

const getAllHouses = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await HouseService.getAllHouses(req.query, paginationOptions);
  sendResponse<IHouse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All houses got successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getHouseByToken = catchAsync(async (req: Request, res: Response) => {
  console.log('req.user', req.user);
  if (!req.user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No data found!');
  }

  const result = await HouseService.getHouseByToken(req.user);

  sendResponse<IHouse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My house got successfully!',

    data: result,
  });
});

const getSingleHouse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HouseService.getSingleHouse(id);

  sendResponse<IHouse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single house got successfully!',
    data: result,
  });
});

const updateHouse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  if (Object.keys(updatedData).length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No data found to update!');
  }
  const result = await HouseService.updateHouse(id, updatedData);

  sendResponse<IHouse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'House updated successfully!',
    data: result,
  });
});

const deleteHouse = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await HouseService.deleteHouse(id);

  sendResponse<IHouse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully!',
    data: result,
  });
});

export const HouseController = {
  createHouse,
  getAllHouses,
  getSingleHouse,
  updateHouse,
  deleteHouse,
  getHouseByToken,
};
