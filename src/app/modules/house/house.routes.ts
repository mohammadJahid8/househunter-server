import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';
import upload from '../../middlewares/multer';
import { HouseController } from './house.cotroller';

const router = express.Router();

router.post('/upload', upload.single('file'), function (req, res) {
  // console.log(req);

  res.send({
    url: `https://house-hunter-server-bay.vercel.app/images/${req?.file?.originalname}`,
  });
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
