'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require('express'));
const enums_1 = require('../../../enums/enums');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const admins_controller_1 = require('./admins.controller');
const router = express_1.default.Router();
router.get(
  '/my-profile',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.ADMIN),
  admins_controller_1.AdminController.getMyProfile
);
router.patch(
  '/my-profile',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.ADMIN),
  admins_controller_1.AdminController.updateMyProfile
);
router.post('/create-admin', admins_controller_1.AdminController.createAdmin);
router.post('/refresh-token', admins_controller_1.AdminController.refreshToken);
router.post('/login', admins_controller_1.AdminController.adminLogin);
exports.AdminRoutes = router;
