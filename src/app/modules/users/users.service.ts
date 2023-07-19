/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});

  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const { name, ...userData } = payload;

  const updateUserData: Partial<IUser> = { ...userData };

  //   check if role is only seller or buyer
  if (
    userData.role &&
    userData.role !== 'seller' &&
    userData.role !== 'buyer'
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Role must be either seller or buyer'
    );
  }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updateUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate(
    {
      _id: id,
    },
    updateUserData,
    {
      new: true,
    }
  );
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

const getMyProfile = async (
  payload: Record<string, unknown>
): Promise<IUser | null> => {
  const result = await User.findById(payload.id);

  return result;
};

const updateMyProfile = async (
  payload: Record<string, unknown>,
  updatedData: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById(payload.id);

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  const updateUserData: Partial<IUser> = { ...updatedData };

  Object.keys(updateUserData).forEach(key => {
    (isExist as any)[key] = (updateUserData as any)[key];
  });

  const result = await isExist.save();

  return result;
};

export const UsersService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
