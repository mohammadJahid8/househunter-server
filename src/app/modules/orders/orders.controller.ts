import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './orders.interface';
import { OrdersService } from './orders.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrdersService.createOrder(req.body.cow, req.body.buyer);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow buyed successfully',
    data: result,
  });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrdersService.getOrders(req.user);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrdersService.getSingleOrder(req.params.id);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Order retrieved successfully',
    data: result,
  });
});

export const OrdersController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
