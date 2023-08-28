import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET || "kksscbskhfuyquowyeoiu";

export const verifyToken = (
  token: string,
  callback: (userData: JwtPayload | null) => void
) => {
  jwt.verify(token, jwtSecret, {}, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      callback(null);
    } else {
      const userData = decoded as JwtPayload;
      callback(userData);
    }
  });
};
