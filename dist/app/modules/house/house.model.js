"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const mongoose_1 = require("mongoose");
const house_constants_1 = require("./house.constants");
const CowModel = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    availabilityDate: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    roomSize: {
        type: Number,
        required: true,
    },
    rentPerMonth: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: house_constants_1.houseLabel,
    },
    owner: {
        type: String,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.House = (0, mongoose_1.model)('House', CowModel);
