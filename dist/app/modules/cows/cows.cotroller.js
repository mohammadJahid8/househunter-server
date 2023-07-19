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
exports.CowsController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const pagination_1 = require('../../../constants/pagination');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const lowercaseQuery_1 = __importDefault(
  require('../../../shared/lowercaseQuery')
);
const pick_1 = __importDefault(require('../../../shared/pick'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const cows_constants_1 = require('./cows.constants');
const cows_service_1 = require('./cows.service');
const createCow = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_service_1.CowsService.createCow(req.body);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Cow created successfully',
      data: result,
    });
  })
);
const getAllCows = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const lowercasedQuery = (0, lowercaseQuery_1.default)(req.query);
    const filters = (0, pick_1.default)(
      lowercasedQuery,
      cows_constants_1.CowFilterableFields
    );
    const paginationOptions = (0, pick_1.default)(
      lowercasedQuery,
      pagination_1.paginationFields
    );
    const result = yield cows_service_1.CowsService.getAllCows(
      filters,
      paginationOptions
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All cows got successfully!',
      meta: result.meta,
      data: result.data,
    });
  })
);
const getSingleCow = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cows_service_1.CowsService.getSingleCow(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single Cow got successfully!',
      data: result,
    });
  })
);
const updateCow = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    if (Object.keys(updatedData).length === 0) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'No data found to update!'
      );
    }
    const result = yield cows_service_1.CowsService.updateCow(id, updatedData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Cow updated successfully!',
      data: result,
    });
  })
);
const deleteCow = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cows_service_1.CowsService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Cow deleted successfully!',
      data: result,
    });
  })
);
exports.CowsController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
