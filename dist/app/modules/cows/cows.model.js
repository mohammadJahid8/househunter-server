'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Cow = void 0;
const mongoose_1 = require('mongoose');
const cows_constants_1 = require('./cows.constants');
const CowModel = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cows_constants_1.cowLocaltions,
    },
    breed: {
      type: String,
      required: true,
      enum: cows_constants_1.cowBreeds,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: cows_constants_1.cowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: cows_constants_1.cowCategory,
    },
    seller: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.Cow = (0, mongoose_1.model)('Cow', CowModel);
