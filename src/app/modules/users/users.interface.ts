/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUserRoles = 'owner' | 'renter';

export type IUser = {
  _id: string;
  role: string;
  password: string;
  name: string;
  phoneNumber: string;
  email: string;
};

export type IUserLogin = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatch(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;

export type IRefreshTokenResponse = {
  accessToken: string;
};
