"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    house: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'House',
    },
    renter: {
        type: String,
        ref: 'User',
    },
    owner: {
        type: String,
        ref: 'User',
    },
    orderStatus: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', OrderSchema);
