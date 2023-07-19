'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require('express'));
const enums_1 = require('../../../enums/enums');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const orders_controller_1 = require('./orders.controller');
const router = express_1.default.Router();
router.post(
  '/',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.BUYER),
  orders_controller_1.OrdersController.createOrder
);
router.get(
  '/:id',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.ADMIN,
    enums_1.ENUM_USER_ROLE.BUYER,
    enums_1.ENUM_USER_ROLE.SELLER
  ),
  orders_controller_1.OrdersController.getSingleOrder
);
router.get(
  '/',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.ADMIN,
    enums_1.ENUM_USER_ROLE.BUYER,
    enums_1.ENUM_USER_ROLE.SELLER
  ),
  orders_controller_1.OrdersController.getOrders
);
exports.OrderRoutes = router;
