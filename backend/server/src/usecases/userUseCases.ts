import { IBlog } from "../models/blogModel";
import userRepository from "../repositories/userRepository";

export const getUser = async (id: string) => {
  try {
    return await userRepository.fetchUserDetails(id);
  } catch (error) {
    throw new Error("Error in fetching user details");
  }
};

export const createUserBlog = async (blogData: IBlog) => {
  console.log("userUsecases", blogData);
  try {
    return await userRepository.createBlog(blogData);
  } catch (error) {
    throw new Error("Error in blog creation");
  }
};

export const getAllBlogs = async () => {
  try {
    return await userRepository.getBlogs();
  } catch (error) {
    throw new Error("Error in fetching blogs");
  }
};

export const getUserBlogs = async (id: string) => {
  try {
    return await userRepository.fetchUserBlogs(id);
  } catch (error) {
    throw new Error("Error in fetching user blogs");
  }
};

export const deleteUserBlog = async (id: string) => {
  try {
    return await userRepository.deleteBlog(id);
  } catch (error) {
    throw new Error("Error in deleting blog");
  }
};
