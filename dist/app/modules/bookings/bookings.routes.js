"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsRoute = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../../../enums/enums");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const bookings_controller_1 = require("./bookings.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.RENTER), bookings_controller_1.OrdersController.createBooking);
router.get('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER, enums_1.ENUM_USER_ROLE.RENTER), bookings_controller_1.OrdersController.getSingleBooking);
router.get('/', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER, enums_1.ENUM_USER_ROLE.RENTER), bookings_controller_1.OrdersController.getBookings);
exports.BookingsRoute = router;
