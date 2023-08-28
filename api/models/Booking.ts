import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Places",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
  },
  phone: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const BookingModel = mongoose.model("Booking", bookingSchema);
