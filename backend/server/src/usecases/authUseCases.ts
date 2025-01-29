import { IUser } from "../models/userModel";
import AuthRepository from "../repositories/AuthRepository";
import { comparePassword, hashPassword } from "../services/bcryptService";
import { generateRefreshToken, generateToken } from "../services/tokenService";

import validation from "../utils/validation";

export const userRegister = async (user: IUser) => {
  try {
    validation.validateUserSignup(user);
    const existinguser = await AuthRepository.findUserByEmail(user.email);
    if (existinguser) {
      throw new Error("User already exist with this email");
    }
    user.password = await hashPassword(user.password);
    const respone = await AuthRepository.createUser(user);
    console.log(respone);
    return respone;
  } catch (error) {
    throw new Error("Error in register new user");
  }
};

export const signInUser = async (email: string, password: string) => {
  const user = await AuthRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  } else if (!user.isVerified) {
    throw new Error("User is not verified");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user.id, user.firstName, user.lastName);
  const refreshToken = generateRefreshToken(
    user.id,
    user.firstName,
    user.lastName
  );
  return { token, refreshToken, user };
};
