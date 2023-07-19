'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Order = void 0;
const mongoose_1 = require('mongoose');
const OrderSchema = new mongoose_1.Schema(
  {
    cow: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Cow',
    },
    price: {
      type: Number,
      required: true,
    },
    buyer: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
    seller: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
