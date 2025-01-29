import { IEmailService } from "../models/emailModel";
import AuthRepository from "../repositories/AuthRepository";
import { generateOTP, verifyOTP } from "../services/otpSerevice";

export const sendVerificationEmail = async (
  email: string,
  emailService: IEmailService,
  userType: string
) => {
  console.log("otpUsecases");
  if (userType === "forgotPass") {
    const user = await AuthRepository.findUserByEmail(email);
    console.log("otp usecases patient", user);
    if (!user) {
      throw new Error("Email is not registerd with us");
    }
  }
  const otp = generateOTP(email);
  console.log(otp);
  await emailService.sendOTP(email, otp);
  return otp;
};

export const verifyEmail = async (
  email: string,
  otp: string,
  userType: string
) => {
  const isValidOtp = verifyOTP(email, otp);
  console.log("verifyemail", email, otp, userType);
  if (isValidOtp) {
    if (isValidOtp) {
      if (userType === "forgotPass") {
        return await AuthRepository.findUserByEmail(email);
      } else {
        return await AuthRepository.verifyUser(email);
      }
    }
    throw new Error("Invalid OTP");
  }
};
