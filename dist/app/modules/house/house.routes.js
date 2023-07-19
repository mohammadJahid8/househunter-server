"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../../../enums/enums");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_1 = __importDefault(require("../../middlewares/multer"));
const house_cotroller_1 = require("./house.cotroller");
const router = express_1.default.Router();
router.post('/upload', multer_1.default.single('file'), function (req, res) {
    // console.log(req);
    var _a;
    res.send({
        url: `https://house-hunter-server-bay.vercel.app/images/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
    });
});
router.get('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER, enums_1.ENUM_USER_ROLE.RENTER), house_cotroller_1.HouseController.getSingleHouse);
router.get('/get/my-houses', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.getHouseByToken);
router.post('/', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.createHouse);
router.get('/', house_cotroller_1.HouseController.getAllHouses);
router.patch('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.updateHouse);
router.delete('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.deleteHouse);
exports.HouseRoutes = router;
