"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lowercaseQuery = (queryObj) => {
    const lowercaseObj = {};
    for (const key in queryObj) {
        if (Object.prototype.hasOwnProperty.call(queryObj, key)) {
            const lowercaseKey = key.toLowerCase();
            const value = queryObj[key];
            const lowercaseValue = typeof value === 'string' ? value.toLowerCase() : value;
            lowercaseObj[lowercaseKey] = lowercaseValue;
        }
    }
    return lowercaseObj;
};
exports.default = lowercaseQuery;
