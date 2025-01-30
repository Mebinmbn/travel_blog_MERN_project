import { IUser } from "../../backend/server/src/models/userModel";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  authorId: IUser;
  imageUrl: {
    filename: string;
    originalname: string;
    path: string;
  };
  createdAt: Date;
}
