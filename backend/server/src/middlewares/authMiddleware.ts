import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
import UserModel from "../models/userModel";

config();

interface UserPayload extends jwt.JwtPayload {
  id: string;
  role: string;
  isBlocked: boolean;
}
interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    req.user = decoded;
    let user;

    user = await UserModel.findOne({ _id: decoded.id });

    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired" });
      return;
    }
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
