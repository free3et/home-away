import mongoose, { Schema } from "mongoose";

const placesSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  perks: {
    type: [String],
  },
  extraInfo: {
    type: String,
  },
  checkInTime: {
    type: String,
  },
  checkOutTime: {
    type: String,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const PlacesModel = mongoose.model("Places", placesSchema);
