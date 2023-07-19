"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// all routes
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to  house hunter!');
});
// global error handler
app.use(globalErrorhandler_1.default);
// handle not found routes
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: `Can't find ${req.originalUrl} on house hunter server!`,
        errorMessages: [
            {
                path: req.originalUrl,
                message: `Api not found!`,
            },
        ],
    });
    next();
});
exports.default = app;
