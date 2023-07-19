"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const users_model_1 = require("../users/users.model");
const createAuthUser = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.create(authUser);
    return result;
});
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield users_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatch = isUserExist.password &&
        (yield users_model_1.User.isPasswordMatch(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password));
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect password');
    }
    const tokenPayload = {
        id: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(tokenPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(tokenPayload, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    // check deleted admins refresh token
    const { email } = verifiedToken;
    const isAdminExist = yield users_model_1.User.isUserExist(email);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isAdminExist.email,
        role: isAdminExist.role,
    }, config_1.default.jwt.secret, (_a = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.jwt) === null || _a === void 0 ? void 0 : _a.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthUserService = {
    createAuthUser,
    refreshToken,
    userLogin,
};
