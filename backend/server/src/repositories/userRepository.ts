import BlogModel, { IBlog } from "../models/blogModel";
import UserModel from "../models/userModel";
import { Blog } from "../utils/types";

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

const getBlogs = async (page: number, limit: number) => {
  try {
    console.log(page, limit);
    const blogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("authorId", "firstName lastName");
    const totalDocs = await BlogModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);
    return { blogs, totalDocs, totalPages };
  } catch (error) {
    throw new Error("Error in fetching blogs");
  }
};

const fetchUserBlogs = async (id: string, page: number, limit: number) => {
  try {
    const blogs = await BlogModel.find({ authorId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const totalDocs = await BlogModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);
    return { blogs, totalDocs, totalPages };
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

const updateBlog = async (blogData: Partial<Blog>) => {
  console.log("blog data in repo", blogData);

  const updateField: Partial<Blog> = {
    title: blogData.title,
    content: blogData.content,
  };
  if (blogData.imageUrl) {
    updateField.imageUrl = blogData.imageUrl;
  }
  const blog = await BlogModel.findOneAndUpdate(
    { _id: blogData._id },
    { $set: updateField },
    { new: true }
  );
  return blog;
};

export default {
  fetchUserDetails,
  createBlog,
  getBlogs,
  fetchUserBlogs,
  deleteBlog,
  updateBlog,
};
