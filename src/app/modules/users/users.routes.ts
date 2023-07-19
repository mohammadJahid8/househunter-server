import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';
import { UserController } from './users.controller';

const router = express.Router();

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.RENTER),
  UserController.getMyProfile
);
router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.RENTER),
  UserController.updateMyProfile
);
router.get('/:id', UserController.getSingleUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
