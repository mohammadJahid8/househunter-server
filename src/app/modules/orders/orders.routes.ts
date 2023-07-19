import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';
import { OrdersController } from './orders.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.BUYER), OrdersController.createOrder);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrdersController.getSingleOrder
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrdersController.getOrders
);

export const OrderRoutes = router;
