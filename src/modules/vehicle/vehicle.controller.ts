import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";
import { vehicleRoutes } from "./vehicle.routes";

const createVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  console.log(req.body);
  // Logic to create a vehicle
  try {
    const newVehicle = await vehicleService.addVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );

    res.status(201).json({
      status: "success",
      message: "Vehicle created successfully",
      vehicle: newVehicle.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create vehicle",
      error: error,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await vehicleService.getVehicles();
    res.status(200).json({
      status: "success",
      vehicles: vehicles.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch vehicles",
      error: error,
    });
  }
};

const singleVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const vehicle = await vehicleService.singleVehicle(Number(id));
    res.status(200).json({
      status: "success",
      vehicle: vehicle.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch vehicle",
      error: error,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehicleService.updateVehicle(
      Number(id),
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
    );
    res.status(200).json({
      status: "success",
      message: "Vehicle updated successfully",
      vehicle: result.rows[0],
    });
  } catch (error:any) {
    res.status(500).json({
      status: "error",
      message: "Failed to update vehicle",
      error: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await vehicleService.deleteVehicle(Number(id));
    res.status(200).json({
      status: "success",
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete vehicle",
      error: error,
    });
  }
};

export const vehicleController = {
  createVehicle,
  getVehicles,
  singleVehicle,
  updateVehicle,
  deleteVehicle,
};
