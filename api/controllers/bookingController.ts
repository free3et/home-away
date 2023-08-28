import { Request, Response } from "express";
require("dotenv").config();
import { BookingModel } from "../models/Booking";
import { verifyToken } from "./verifyToken";

const jwtSecret = process.env.JWT_SECRET || "kksscbskhfuyquowyeoiu";

export const createBooking = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  verifyToken(token, async (userData) => {
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      surname,
      phone,
      price,
    } = req.body;
    const bookingDoc = await BookingModel.create({
      place,
      user: userData.id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      surname,
      phone,
      price,
    });
    res.json(bookingDoc);
  });
};

export const getBooking = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  verifyToken(token, async (userData) => {
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = userData;

    res.json(await BookingModel.find({ user: id }).populate("place"));
  });
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  verifyToken(token, async (userData) => {
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    try {
      const bookingDoc = await BookingModel.findByIdAndDelete(id);

      if (!bookingDoc) {
        return res.status(404).json({ message: "Booking not found" });
      }

      res.json(bookingDoc);
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
