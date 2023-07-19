import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortby?: string;
  sortorder?: SortOrder;
  minprice?: number;
  maxprice?: number;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortby: string;
  sortorder: SortOrder;
  minprice?: number;
  maxprice?: number;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortby = options.sortby || 'createdAt';
  const sortorder = options.sortorder || 'desc';
  const minprice = Number(options.minprice) || 0;
  const maxprice = Number(options.maxprice) || 0;

  return {
    page,
    limit,
    skip,
    sortby,
    sortorder,
    minprice,
    maxprice,
  };
};

export const PaginationHelper = {
  calculatePagination,
};
