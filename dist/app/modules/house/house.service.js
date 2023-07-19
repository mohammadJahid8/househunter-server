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
exports.HouseService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const house_constants_1 = require('./house.constants');
const house_model_1 = require('./house.model');
const createHouse = authUser =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield house_model_1.House.create(authUser);
    return result;
  });
const getAllHouses = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchterm } = filters;
    const { page, limit, skip, sortby, sortorder } =
      paginationHelper_1.PaginationHelper.calculatePagination(
        paginationOptions
      );
    const andCondition = [];
    if (searchterm) {
      andCondition.push({
        $or: house_constants_1.HouseSearchableFields.map(field => ({
          [field]: {
            $regex: searchterm,
            $options: 'i',
          },
        })),
      });
    }
    const sortCondition = {};
    if (sortby && sortorder) {
      sortCondition[sortby] = sortorder;
    }
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    const total = yield house_model_1.House.countDocuments(whereCondition);
    const result = yield house_model_1.House.find(whereCondition)
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
  });
const getSingleHouse = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield house_model_1.House.findById(id);
    return result;
  });
const updateHouse = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield house_model_1.House.findOne({ _id: id });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'User not found'
      );
    }
    const updateHouseData = payload;
    const result = yield house_model_1.House.findOneAndUpdate(
      {
        _id: id,
      },
      updateHouseData,
      {
        new: true,
      }
    );
    return result;
  });
const deleteHouse = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield house_model_1.House.findByIdAndDelete(id);
    return result;
  });
exports.HouseService = {
  createHouse,
  getAllHouses,
  getSingleHouse,
  updateHouse,
  deleteHouse,
};
