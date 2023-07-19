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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminController = void 0;
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const admins_service_1 = require('./admins.service');
const createAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const adminData = __rest(req.body, []);
    const result = yield admins_service_1.AdminService.createAdmin(adminData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  })
);
const adminLogin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield admins_service_1.AdminService.adminLogin(loginData);
    const { refreshToken } = result,
      rest = __rest(result, ['refreshToken']);
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Admin logged in successfully',
      data: rest,
    });
  })
);
const refreshToken = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield admins_service_1.AdminService.refreshToken(
      refreshToken
    );
    const cookieOptions = {
      secure: config_1.default.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'New access token generated successfully !',
      data: result,
    });
  })
);
const getMyProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Admin not found'
      );
    }
    const result = yield admins_service_1.AdminService.getMyProfile(req.user);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'My profile got successfully!',
      data: result,
    });
  })
);
const updateMyProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    if (Object.keys(updatedData).length === 0) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'No data found to update!'
      );
    }
    if (!req.user) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Admin not found'
      );
    }
    const result = yield admins_service_1.AdminService.updateMyProfile(
      req.user,
      updatedData
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'My profile updated successfully!',
      data: result,
    });
  })
);
exports.AdminController = {
  createAdmin,
  adminLogin,
  refreshToken,
  getMyProfile,
  updateMyProfile,
};
