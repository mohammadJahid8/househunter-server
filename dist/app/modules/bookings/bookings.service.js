"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const house_model_1 = require("../house/house.model");
const bookings_model_1 = require("./bookings.model");
const createBooking = (HouseId, renterEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // const renter = await User.find({
    //   email: renterEmail,
    // });
    const house = yield house_model_1.House.findById(HouseId);
    const ownerEmail = house === null || house === void 0 ? void 0 : house.owner;
    // const owner = await User.find({
    //   email: ownerEmail,
    // });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedHouse = yield house_model_1.House.findByIdAndUpdate(HouseId, { label: 'booked' }, { session, new: true });
        const bookingIntent = {
            house: updatedHouse === null || updatedHouse === void 0 ? void 0 : updatedHouse.id,
            renter: renterEmail,
            owner: ownerEmail,
            orderStatus: 'success',
        };
        const order = new bookings_model_1.Booking(bookingIntent);
        yield order.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return bookingIntent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        query = {};
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer') {
        query = { buyer: user === null || user === void 0 ? void 0 : user.id };
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === 'owner') {
        query = { owner: user === null || user === void 0 ? void 0 : user.id };
    }
    const orders = yield bookings_model_1.Booking.find(query);
    return orders;
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleOrder = yield bookings_model_1.Booking.findById(id)
        .populate('house')
        .populate('renter');
    return singleOrder;
});
exports.OrdersService = {
    createBooking,
    getBookings,
    getSingleBooking,
};
