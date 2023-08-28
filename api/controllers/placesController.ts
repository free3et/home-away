import { Request, Response } from "express";
import { PlacesModel } from "../models/Places";
require("dotenv").config();
import { verifyToken } from "./verifyToken";

export const createPlace = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    price,
  } = req.body;

  try {
    verifyToken(token, async (userData) => {
      if (!userData) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const placeDoc = await PlacesModel.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        price,
      });

      res.json(placeDoc);
    });
  } catch (error) {
    console.error("Error creating place:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPlacesByOwner = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  verifyToken(token, async (userData) => {
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = userData;

    try {
      const places = await PlacesModel.find({ owner: id });
      res.json(places);
    } catch (error) {
      console.error("Error fetching places:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const getPlaceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json(await PlacesModel.findById(id));
};

export const updatePlace = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    price,
  } = req.body;

  verifyToken(token, async (userData) => {
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const placeDoc = await PlacesModel.findById(id);

    if (userData.id === placeDoc?.owner?.toString()) {
      placeDoc?.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        price,
      });

      try {
        await placeDoc?.save();
        res.json("ok");
      } catch (error) {
        console.error("Error updating place:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  });
};

export const deletePlace = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  verifyToken(token, async (userData) => {
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;
    try {
      const placeDoc = await PlacesModel.findByIdAndDelete(id);

      if (!placeDoc) {
        return res.status(404).json({ message: "Place not found" });
      }

      res.json(placeDoc);
    } catch (error) {
      console.error("Error deleting place:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

export const getAllPlaces = async (req: Request, res: Response) => {
  res.json(await PlacesModel.find());
};
