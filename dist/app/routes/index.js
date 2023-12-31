"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const bookings_routes_1 = require("../modules/bookings/bookings.routes");
const house_routes_1 = require("../modules/house/house.routes");
const users_routes_1 = require("../modules/users/users.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthUserRoutes,
    },
    {
        path: '/users',
        route: users_routes_1.UserRoutes,
    },
    {
        path: '/house',
        route: house_routes_1.HouseRoutes,
    },
    {
        path: '/bookings',
        route: bookings_routes_1.BookingsRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
