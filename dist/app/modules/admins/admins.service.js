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
exports.AdminService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const config_1 = __importDefault(require('../../../config'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const admins_model_1 = require('./admins.model');
const createAdmin = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admins_model_1.Admin.create(payload);
    return result;
  });
const adminLogin = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admins_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Admin does not exist'
      );
    }
    const isPasswordMatch =
      isAdminExist.password &&
      (yield admins_model_1.Admin.isPasswordMatch(
        password,
        isAdminExist === null || isAdminExist === void 0
          ? void 0
          : isAdminExist.password
      ));
    if (!isPasswordMatch) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Incorrect password'
      );
    }
    const payLoad = {
      id: isAdminExist._id,
      phoneNumber: isAdminExist.phoneNumber,
      role: isAdminExist.role,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      payLoad,
      config_1.default.jwt.secret,
      (_a =
        config_1.default === null || config_1.default === void 0
          ? void 0
          : config_1.default.jwt) === null || _a === void 0
        ? void 0
        : _a.expires_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      payLoad,
      config_1.default.jwt.refresh_secret,
      (_b =
        config_1.default === null || config_1.default === void 0
          ? void 0
          : config_1.default.jwt) === null || _b === void 0
        ? void 0
        : _b.refresh_expires_in
    );
    return {
      accessToken,
      refreshToken,
    };
  });
const refreshToken = token =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    // verify token
    let verifiedToken = null;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        token,
        config_1.default.jwt.refresh_secret
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid refresh token'
      );
    }
    // check deleted admins refresh token
    const { phoneNumber } = verifiedToken;
    const isAdminExist = yield admins_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Admin does not exist'
      );
    }
    // generate new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      {
        phoneNumber: isAdminExist.phoneNumber,
        role: isAdminExist.role,
      },
      config_1.default.jwt.secret,
      (_c =
        config_1.default === null || config_1.default === void 0
          ? void 0
          : config_1.default.jwt) === null || _c === void 0
        ? void 0
        : _c.expires_in
    );
    return {
      accessToken: newAccessToken,
    };
  });
const getMyProfile = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admins_model_1.Admin.findById(payload.id);
    return result;
  });
const updateMyProfile = (payload, updatedData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admins_model_1.Admin.findById(payload.id);
    if (!isExist) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Admin not found'
      );
    }
    const { name } = updatedData,
      userData = __rest(updatedData, ['name']);
    const updateUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
      updateUserData.name = Object.assign({}, name);
    }
    Object.keys(updateUserData).forEach(key => {
      isExist[key] = updateUserData[key];
    });
    const result = yield isExist.save();
    return result;
  });
exports.AdminService = {
  createAdmin,
  adminLogin,
  refreshToken,
  getMyProfile,
  updateMyProfile,
};
