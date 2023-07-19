import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { Cow } from '../cows/cows.model';
import { User } from '../users/users.model';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';

const createOrder = async (cowId: Types.ObjectId, buyerId: Types.ObjectId) => {
  const buyer = await User.findById(buyerId);
  const cow = await Cow.findById(cowId);
  const sellerId = cow?.seller;
  const seller = await User.findById(sellerId);

  if (!buyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer not found!');
  } else if (buyer.role !== 'buyer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only buyers can buy cows!');
  } else if (!seller) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not found!');
  } else if (!cow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found!');
  } else if (cow?.label === 'sold out') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is sold out!');
  } else if (buyer.budget < cow.price) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough money to buy cow!');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedCow = await Cow.findByIdAndUpdate(
      cowId,
      { label: 'sold out' },
      { session, new: true }
    );
    const updatedBuyer = await User.findByIdAndUpdate(
      buyerId,
      { budget: buyer.budget - cow.price },
      { session, new: true }
    );
    const updatedSeller = await User.findByIdAndUpdate(sellerId, {
      income: seller.income + cow.price,
    });

    const orderIntent = {
      cow: updatedCow?.id,
      buyer: updatedBuyer?.id,
      seller: updatedSeller?.id,
      price: cow.price,
      orderStatus: 'success',
    };
    const order = new Order(orderIntent);
    await order.save({ session });

    await session.commitTransaction();
    await session.endSession();
    return orderIntent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getOrders = async (user: JwtPayload | null): Promise<IOrder[]> => {
  let query = {};
  if (user?.role === 'admin') {
    query = {};
  } else if (user?.role === 'buyer') {
    query = { buyer: user?.id };
  } else if (user?.role === 'seller') {
    query = { seller: user?.id };
  }

  const orders = await Order.find(query);
  return orders;
};
const getSingleOrder = async (id: string) => {
  const singleOrder = await Order.findById(id)
    .populate('cow')
    .populate('buyer');

  return singleOrder;
};

export const OrdersService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
