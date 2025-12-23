import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

  try {
    const result = await bookingService.createBooking(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date
    );
    res.status(201).json({
      status: "success",
      message: "Booking created successfully",
      booking: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to create booking",
      error: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  const user = req.user!;
  try {
    const result = await bookingService.getBookings(user.id, user.role);
    res.status(200).json({
      status: "success",
      message: "Bookings fetched successfully",
      bookings: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch bookings",
      error: err.message,
    });
  }
};

const updateBookings = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const user = req.user!;
  console.log(user);
  const { status } = req.body;
  

  try {
    const booking = await bookingService.getBookingById(Number(bookingId));

    if (!booking) {
      return res
        .status(404)
        .json({ status: "error", message: "Booking not found" });
    }

    const now = new Date();

    if (user.role === "customer") {
      // Customer can cancel only if they own the booking and before start date
      if (booking.customer_id !== user.id) {
        return res
          .status(403)
          .json({ status: "error", message: "Forbidden: Not your booking" });
      }

      if (new Date(booking.rent_start_date) <= now) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "Cannot cancel booking after start date",
          });
      }

      booking.status = "cancelled";
      await bookingService.updateBookingStatus(Number(bookingId), status);
      await bookingService.updateVehicleStatus(booking.vehicle_id, "available");

      return res
        .status(200)
        .json({ status: "success", message: "Booking cancelled" });
    }

    if (user.role === "admin") {
      // Admin marks as returned
      if (booking.status === "returned") {
        return res
          .status(400)
          .json({ status: "error", message: "Booking is already returned" });
      }

      await bookingService.updateBookingStatus(Number(bookingId), status);
      await bookingService.updateVehicleStatus(booking.vehicle_id, "available");

      return res
        .status(200)
        .json({ status: "success", message: "Booking marked as returned" });
    }

    return res.status(403).json({ status: "error", message: "Forbidden" });
  } catch (err: any) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Failed to update booking",
        error: err.message,
      });
  }
};


export const bookingController = {
  createBooking,
  getBookings,
  updateBookings,
};
