import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";
import {
  login,
  logout,
  profile,
  registration,
} from "./controllers/authController";
import {
  createPlace,
  deletePlace,
  getAllPlaces,
  getPlaceById,
  getPlacesByOwner,
  updatePlace,
} from "./controllers/placesController";
import {
  createBooking,
  deleteBooking,
  getBooking,
} from "./controllers/bookingController";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in the environment.");
}

mongoose.connect(process.env.MONGO_URL);

// Auth routes
app.post("/registration", registration);
app.post("/login", login);
app.get("/profile", profile);
app.post("/logout", logout);

// Places
app.post("/places", createPlace);
app.get("/user-places", getPlacesByOwner);
app.get("/places/:id", getPlaceById);
app.put("/places/:id", updatePlace);
app.delete("/places/:id", deletePlace);
app.get("/places/", getAllPlaces);

// Booking
app.post("/bookings", createBooking);
app.get("/bookings", getBooking);
app.delete("/bookings/:id", deleteBooking);

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

app.post("/upload", photosMiddleware.array("photos", 10), (req, res, next) => {
  const uploadedFiles: string[] = [];
  const files = req.files as Express.Multer.File[];

  for (let i = 0; i < files.length; i++) {
    const { path, originalname } = files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${__dirname}/uploads/photo${Date.now()}.${ext}`;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(__dirname + "/uploads/", ""));
  }

  res.json(uploadedFiles);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
