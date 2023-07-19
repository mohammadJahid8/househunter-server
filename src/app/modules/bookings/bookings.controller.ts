/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { IBooking } from './bookings.interface';
import { OrdersService } from './bookings.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  await OrdersService.createBooking(req.body.house, req.body.renter);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'hoouse booked successfully',
    data: null,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await OrdersService.getBookings(req.user);

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'booking retrieved successfully',
    data: result,
  });
});
const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await OrdersService.getSingleBooking(req.params.id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single booking retrieved successfully',
    data: result,
  });
});

export const OrdersController = {
  createBooking,
  getBookings,
  getSingleBooking,
};
