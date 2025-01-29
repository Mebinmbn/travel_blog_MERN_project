import { IUser } from "./userModel";

export interface PatientResponse {
  token: string;
  refreshToken: string;
  patient: IUser;
}
