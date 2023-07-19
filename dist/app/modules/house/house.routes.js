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
exports.HouseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const enums_1 = require("../../../enums/enums");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const cloudinary_1 = require("cloudinary");
const http_status_1 = __importDefault(require("http-status"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const house_cotroller_1 = require("./house.cotroller");
const router = express_1.default.Router();
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
router.post('/upload', upload.single('file'), function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path)) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong');
            }
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            const imageUrl = result.secure_url;
            res.json({ message: 'Image uploaded successfully!', url: imageUrl });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        }
    });
});
router.get('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER, enums_1.ENUM_USER_ROLE.RENTER), house_cotroller_1.HouseController.getSingleHouse);
router.get('/get/my-houses', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.getHouseByToken);
router.post('/', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.createHouse);
router.get('/', house_cotroller_1.HouseController.getAllHouses);
router.patch('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.updateHouse);
router.delete('/:id', (0, auth_1.default)(enums_1.ENUM_USER_ROLE.OWNER), house_cotroller_1.HouseController.deleteHouse);
exports.HouseRoutes = router;
