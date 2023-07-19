import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/enums';
import auth from '../../middlewares/auth';
import { OrdersController } from './bookings.controller';

const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.RENTER), OrdersController.createBooking);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.RENTER),
  OrdersController.getSingleBooking
);
router.get('/', auth(ENUM_USER_ROLE.RENTER), OrdersController.getBookings);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.RENTER),
  OrdersController.deleteBookings
);

export const BookingsRoute = router;
