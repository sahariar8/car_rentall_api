import express from "express";
import dotenv from "dotenv";
import config from "./config";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";

dotenv.config();

const app = express();
const port = config.port;


//parser
app.use(express.json());

//call DB initialization
initDB();

app.use("/api/v1/vehicles",vehicleRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
