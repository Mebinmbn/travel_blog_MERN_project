import mongoose, { Schema, Model, Document } from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  authorId: Schema.Types.ObjectId;
  imageUrl: object;
}

const BlogSchema: Schema<IBlog> = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: {
      filename: String,
      originalname: String,
      path: String,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel: Model<IBlog> = mongoose.model<IBlog>("Blog", BlogSchema);

export default BlogModel;
