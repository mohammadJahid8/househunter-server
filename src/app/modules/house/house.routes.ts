import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';

import { v2 as cloudinary } from 'cloudinary';
import httpStatus from 'http-status';
import multer from 'multer';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { HouseController } from './house.cotroller';
const router = express.Router();

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const storage = multer.diskStorage({});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async function (req, res) {
  try {
    if (!req?.file?.path) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const imageUrl = result.secure_url;

    res.json({ message: 'Image uploaded successfully!', url: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.RENTER),
  HouseController.getSingleHouse
);
router.get(
  '/get/my-houses',
  auth(ENUM_USER_ROLE.OWNER),
  HouseController.getHouseByToken
);
router.post('/', auth(ENUM_USER_ROLE.OWNER), HouseController.createHouse);
router.get(
  '/',

  HouseController.getAllHouses
);

router.patch('/:id', auth(ENUM_USER_ROLE.OWNER), HouseController.updateHouse);
router.delete('/:id', auth(ENUM_USER_ROLE.OWNER), HouseController.deleteHouse);

export const HouseRoutes = router;
