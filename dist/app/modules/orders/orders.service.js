'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrdersService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const cows_model_1 = require('../cows/cows.model');
const users_model_1 = require('../users/users.model');
const orders_model_1 = require('./orders.model');
const createOrder = (cowId, buyerId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield users_model_1.User.findById(buyerId);
    const cow = yield cows_model_1.Cow.findById(cowId);
    const sellerId = cow === null || cow === void 0 ? void 0 : cow.seller;
    const seller = yield users_model_1.User.findById(sellerId);
    if (!buyer) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Buyer not found!'
      );
    } else if (buyer.role !== 'buyer') {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Only buyers can buy cows!'
      );
    } else if (!seller) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Seller not found!'
      );
    } else if (!cow) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cow not found!'
      );
    } else if (
      (cow === null || cow === void 0 ? void 0 : cow.label) === 'sold out'
    ) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cow is sold out!'
      );
    } else if (buyer.budget < cow.price) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Not enough money to buy cow!'
      );
    }
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const updatedCow = yield cows_model_1.Cow.findByIdAndUpdate(
        cowId,
        { label: 'sold out' },
        { session, new: true }
      );
      const updatedBuyer = yield users_model_1.User.findByIdAndUpdate(
        buyerId,
        { budget: buyer.budget - cow.price },
        { session, new: true }
      );
      const updatedSeller = yield users_model_1.User.findByIdAndUpdate(
        sellerId,
        {
          income: seller.income + cow.price,
        }
      );
      const orderIntent = {
        cow:
          updatedCow === null || updatedCow === void 0 ? void 0 : updatedCow.id,
        buyer:
          updatedBuyer === null || updatedBuyer === void 0
            ? void 0
            : updatedBuyer.id,
        seller:
          updatedSeller === null || updatedSeller === void 0
            ? void 0
            : updatedSeller.id,
        price: cow.price,
        orderStatus: 'success',
      };
      const order = new orders_model_1.Order(orderIntent);
      yield order.save({ session });
      yield session.commitTransaction();
      yield session.endSession();
      return orderIntent;
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
  });
const getOrders = user =>
  __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
      query = {};
    } else if (
      (user === null || user === void 0 ? void 0 : user.role) === 'buyer'
    ) {
      query = { buyer: user === null || user === void 0 ? void 0 : user.id };
    } else if (
      (user === null || user === void 0 ? void 0 : user.role) === 'seller'
    ) {
      query = { seller: user === null || user === void 0 ? void 0 : user.id };
    }
    const orders = yield orders_model_1.Order.find(query);
    return orders;
  });
const getSingleOrder = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const singleOrder = yield orders_model_1.Order.findById(id)
      .populate('cow')
      .populate('buyer');
    return singleOrder;
  });
exports.OrdersService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
