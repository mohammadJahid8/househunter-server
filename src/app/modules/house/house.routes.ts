import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';
import { HouseController } from './house.cotroller';
const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.RENTER),
  HouseController.getSingleHouse
);
router.post('/', auth(ENUM_USER_ROLE.RENTER), HouseController.createHouse);
router.get(
  '/',
  auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.RENTER),
  HouseController.getAllHouses
);
router.patch('/:id', auth(ENUM_USER_ROLE.RENTER), HouseController.updateHouse);
router.delete('/:id', auth(ENUM_USER_ROLE.RENTER), HouseController.deleteHouse);

export const HouseRoutes = router;
