import BlogModel, { IBlog } from "../models/blogModel";
import UserModel from "../models/userModel";

const fetchUserDetails = async (id: string) => {
  try {
    return await UserModel.findOne({ _id: id });
  } catch (error) {
    throw new Error("Error in fetching user details");
  }
};

const createBlog = async (blogData: Partial<IBlog>) => {
  console.log("blog data in repo", blogData);

  const blog = new BlogModel(blogData);
  console.log("blog", blog);
  await blog.save();
  return blog;
};

const getBlogs = async () => {
  try {
    return await BlogModel.find()
      .sort({ createdAt: -1 })
      .populate("authorId", "firstName lastName");
  } catch (error) {
    throw new Error("Error in fetching blogs");
  }
};

const fetchUserBlogs = async (id: string) => {
  try {
    return await BlogModel.find({ authorId: id }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error in fetchinng user blogs");
  }
};

const deleteBlog = async (id: string) => {
  try {
    return await BlogModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error in deleting blog");
  }
};

export default {
  fetchUserDetails,
  createBlog,
  getBlogs,
  fetchUserBlogs,
  deleteBlog,
};
