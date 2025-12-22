import { pool } from "../../config/db";

const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {
  //date validation
  const startDate = new Date(rent_start_date);
  const endDate = new Date(rent_end_date);
  if (endDate <= startDate) {
    throw new Error("Rent end date must be after rent start date");
  }

  //day calculation
  const days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );

  //vehicle availability check
  const vehicleResult = await pool.query(
    "SELECT * FROM vehicles WHERE id = $1",
    [vehicle_id]
  );
  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  //price calculation
  const price = days * vehicle.daily_rent_price;

  await pool.query("BEGIN");

  try {
    const bookingResult = await pool.query(
      "INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [customer_id, vehicle_id, rent_start_date, rent_end_date, price, "active"]
    );

    await pool.query(
      "UPDATE vehicles SET availability_status = $1 WHERE id = $2",
      ["booked", vehicle_id]
    );

    await pool.query("COMMIT");

    return bookingResult;
  } catch (err: any) {
    await pool.query("ROLLBACK");
    throw new Error(err.message);
  }
};

const getBookings = async (id: number, role: string) => {
  if (role === "admin") {
    const result = await pool.query("SELECT * FROM bookings");
    return result;
  }

  // Customer → own bookings only
  const result = await pool.query(
    "SELECT * FROM bookings WHERE customer_id = $1",
    [id]
  );
  return result;
};

const updateBookings = async (id: number, userId: number, role: string) => {
  if (role === "admin") {
    const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [
      id,
    ]);
    return result;
  }

  const result = await pool.query(
    "SELECT * FROM bookings WHERE id = $1 AND customer_id = $2",
    [id, userId]
  );
  return result;
};

// Get a single booking
export const getBookingById = async (bookingId: number) => {
  const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [
    bookingId,
  ]);
  return result.rows[0];
};

// Update booking status
export const updateBookingStatus = async (
  bookingId: number,
  status: string
) => {
  return pool.query(
    "UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *",
    [status, bookingId]
  );
};

// Update vehicle status (for admin return)
export const updateVehicleStatus = async (
  vehicleId: number,
  status: string
) => {
  return pool.query(
    "UPDATE vehicles SET status = $1 WHERE id = $2 RETURNING *",
    [status, vehicleId]
  );
};

export const bookingService = {
  createBooking,
  getBookings,
  updateBookings,
  getBookingById,
  updateBookingStatus,
  updateVehicleStatus,
};
