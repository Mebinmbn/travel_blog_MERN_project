import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

export const generateToken = (
  userId: string,
  userFirstName: string,
  userLastName: string
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not defined");
  }
  console.log(secret);
  return jwt.sign(
    { id: userId, firstName: userFirstName, userLastName: userLastName },
    secret,
    { expiresIn: "30m" }
  );
};

export const generateRefreshToken = (
  userId: string,
  userFirstName: string,
  userLastName: string
): string => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshSecret) {
    throw new Error("REFRESH_TOKEN_SECRET not defined");
  }
  return jwt.sign(
    { id: userId, firstName: userFirstName, userLastName: userLastName },
    refreshSecret,
    { expiresIn: "7d" }
  );
};
