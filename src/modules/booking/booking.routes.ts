import { Router } from "express";
import { bookingController } from "./booking.controller";
import adminOrSelf from "../../middleware/self";
import auth from "../../middleware/auth";
import roleBased from "../../middleware/role";


const router = Router();

router.post("/",bookingController.createBooking);
router.get("/",auth(),roleBased("admin","customer"),bookingController.getBookings);
router.put("/:bookingId",auth(),roleBased("admin","customer"),bookingController.updateBookings);

export const bookingRoutes = router;