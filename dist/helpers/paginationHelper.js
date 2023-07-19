'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaginationHelper = void 0;
const calculatePagination = options => {
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
exports.PaginationHelper = {
  calculatePagination,
};
