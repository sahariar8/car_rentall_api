import express from "express";
import dotenv from "dotenv";
import config from "./config";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";

dotenv.config();

const app = express();
const port = config.port;


//parser
app.use(express.json());

//call DB initialization
initDB();

app.use("/api/v1/vehicles",vehicleRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/bookings",bookingRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
