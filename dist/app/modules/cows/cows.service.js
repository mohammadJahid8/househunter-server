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
exports.CowsService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const cows_constants_1 = require('./cows.constants');
const cows_model_1 = require('./cows.model');
const createCow = authUser =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cow.create(authUser);
    return result;
  });
const getAllCows = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchterm, location, maxprice, minprice } = filters;
    const { page, limit, skip, sortby, sortorder } =
      paginationHelper_1.PaginationHelper.calculatePagination(
        paginationOptions
      );
    const andCondition = [];
    if (searchterm) {
      andCondition.push({
        $or: cows_constants_1.CowSearchableFields.map(field => ({
          [field]: {
            $regex: searchterm,
            $options: 'i',
          },
        })),
      });
    }
    if (location) {
      andCondition.push({
        $or: [{ location: { $regex: location, $options: 'i' } }],
      });
    }
    if (minprice) {
      andCondition.push({
        $or: [{ price: { $gte: minprice } }],
      });
    }
    if (maxprice) {
      andCondition.push({
        $or: [{ price: { $lte: maxprice } }],
      });
    }
    if (minprice && maxprice) {
      andCondition.push({
        $or: [{ price: { $gte: minprice, $lte: maxprice } }],
      });
    }
    const sortCondition = {};
    if (sortby && sortorder) {
      sortCondition[sortby] = sortorder;
    }
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    const total = yield cows_model_1.Cow.countDocuments(whereCondition);
    const result = yield cows_model_1.Cow.find(whereCondition)
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
const getSingleCow = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cow.findById(id);
    return result;
  });
const updateCow = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cows_model_1.Cow.findOne({ _id: id });
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'User not found'
      );
    }
    const updateCowData = payload;
    const result = yield cows_model_1.Cow.findOneAndUpdate(
      {
        _id: id,
      },
      updateCowData,
      {
        new: true,
      }
    );
    return result;
  });
const deleteCow = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cow.findByIdAndDelete(id);
    return result;
  });
exports.CowsService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
