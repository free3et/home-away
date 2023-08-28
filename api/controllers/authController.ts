import { Request, Response } from "express";
import { UserModel } from "../models/User";
require("dotenv").config();
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "kksscbskhfuyquowyeoiu";

export const registration = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  try {
    const userDoc = await UserModel.create({
      name,
      email,
      surname,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userDoc = await UserModel.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.status(422).json("not found");
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("token", "").json(true);
};

export const profile = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(null);
  }

  try {
    const userData = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await UserModel.findById(userData.id);

    if (!user) {
      return res.json(null);
    }

    const { name, surname, email, _id } = user;
    res.json({ name, surname, email, _id });
  } catch (err) {
    console.error("Token verification error:", err);
    res.json(null);
  }
};
