import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IRefreshTokenResponse,
  IUser,
  IUserLogin,
  IUserLoginResponse,
} from '../users/users.interface';
import { User } from '../users/users.model';

const createAuthUser = async (authUser: IUser): Promise<IUser | null> => {
  const result = await User.create(authUser);
  return result;
};

const userLogin = async (payload: IUserLogin): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatch =
    isUserExist.password &&
    (await User.isPasswordMatch(password, isUserExist?.password));
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const tokenPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwtHelpers.createToken(
    tokenPayload,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    tokenPayload,
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check deleted admins refresh token
  const { email } = verifiedToken;

  const isAdminExist = await User.isUserExist(email);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      email: isAdminExist.email,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config?.jwt?.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthUserService = {
  createAuthUser,
  refreshToken,
  userLogin,
};
