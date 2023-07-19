'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CowsRoutes = void 0;
const express_1 = __importDefault(require('express'));
const enums_1 = require('../../../enums/enums');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const cows_cotroller_1 = require('./cows.cotroller');
const router = express_1.default.Router();
router.get(
  '/:id',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.ADMIN,
    enums_1.ENUM_USER_ROLE.BUYER,
    enums_1.ENUM_USER_ROLE.SELLER
  ),
  cows_cotroller_1.CowsController.getSingleCow
);
router.post(
  '/',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.SELLER),
  cows_cotroller_1.CowsController.createCow
);
router.get(
  '/',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.ADMIN,
    enums_1.ENUM_USER_ROLE.BUYER,
    enums_1.ENUM_USER_ROLE.SELLER
  ),
  cows_cotroller_1.CowsController.getAllCows
);
router.patch(
  '/:id',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.SELLER),
  cows_cotroller_1.CowsController.updateCow
);
router.delete(
  '/:id',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.SELLER),
  cows_cotroller_1.CowsController.deleteCow
);
exports.CowsRoutes = router;
