const lowercaseQuery = (
  queryObj: Record<string, unknown>
): Record<string, unknown> => {
  const lowercaseObj: Record<string, unknown> = {};

  for (const key in queryObj) {
    if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
      const lowercaseKey = key.toLowerCase();
      const value = queryObj[key];
      const lowercaseValue =
        typeof value === 'string' ? value.toLowerCase() : value;

      lowercaseObj[lowercaseKey] = lowercaseValue;
    }
  }

  return lowercaseObj;
};

export default lowercaseQuery;
