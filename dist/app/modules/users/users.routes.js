'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const enums_1 = require('../../../enums/enums');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const users_controller_1 = require('./users.controller');
const router = express_1.default.Router();
router.get(
  '/my-profile',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.OWNER,
    enums_1.ENUM_USER_ROLE.RENTER
  ),
  users_controller_1.UserController.getMyProfile
);
router.patch(
  '/my-profile',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.OWNER,
    enums_1.ENUM_USER_ROLE.RENTER
  ),
  users_controller_1.UserController.updateMyProfile
);
router.get('/:id', users_controller_1.UserController.getSingleUser);
router.patch('/:id', users_controller_1.UserController.updateUser);
router.delete('/:id', users_controller_1.UserController.deleteUser);
router.get('/', users_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
