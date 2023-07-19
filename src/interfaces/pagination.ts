export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortby?: string;
  sortorder?: 'asc' | 'desc';
  minprice?: number;
  maxprice?: number;
  location?: string;
};
