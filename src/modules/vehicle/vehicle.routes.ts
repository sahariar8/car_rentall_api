
import Router from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";
import adminOnly from "../../middleware/admin";

const router = Router();

router.post("/",auth(),adminOnly(),vehicleController.createVehicle );
router.get("/",vehicleController.getVehicles );
router.get("/:vehicleId",vehicleController.singleVehicle);
router.put("/:vehicleId",auth(),adminOnly(),vehicleController.updateVehicle);
router.delete("/:vehicleId",auth(),adminOnly(),vehicleController.deleteVehicle);

export const vehicleRoutes = router;