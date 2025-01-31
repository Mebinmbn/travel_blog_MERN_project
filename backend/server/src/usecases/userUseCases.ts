import { IBlog } from "../models/blogModel";
import userRepository from "../repositories/userRepository";
import { Blog } from "../utils/types";

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

export const getAllBlogs = async (page: number, limit: number) => {
  try {
    return await userRepository.getBlogs(page, limit);
  } catch (error) {
    throw new Error("Error in fetching blogs");
  }
};

export const getUserBlogs = async (id: string, page: number, limit: number) => {
  try {
    return await userRepository.fetchUserBlogs(id, page, limit);
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

export const updateUserBlog = async (blogData: Partial<Blog>) => {
  console.log("userUsecases", blogData);
  try {
    return await userRepository.updateBlog(blogData);
  } catch (error) {
    throw new Error("Error in blog creation");
  }
};
