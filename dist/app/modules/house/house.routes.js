'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.HouseRoutes = void 0;
const express_1 = __importDefault(require('express'));
const enums_1 = require('../../../enums/enums');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const house_cotroller_1 = require('./house.cotroller');
const router = express_1.default.Router();
router.get(
  '/:id',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.OWNER,
    enums_1.ENUM_USER_ROLE.RENTER
  ),
  house_cotroller_1.HouseController.getSingleHouse
);
router.post(
  '/',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.RENTER),
  house_cotroller_1.HouseController.createHouse
);
router.get(
  '/',
  (0, auth_1.default)(
    enums_1.ENUM_USER_ROLE.OWNER,
    enums_1.ENUM_USER_ROLE.RENTER
  ),
  house_cotroller_1.HouseController.getAllHouses
);
router.patch(
  '/:id',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.RENTER),
  house_cotroller_1.HouseController.updateHouse
);
router.delete(
  '/:id',
  (0, auth_1.default)(enums_1.ENUM_USER_ROLE.RENTER),
  house_cotroller_1.HouseController.deleteHouse
);
exports.HouseRoutes = router;
