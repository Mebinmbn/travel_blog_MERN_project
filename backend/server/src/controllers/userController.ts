import { Request, Response } from "express";
import {
  createUserBlog,
  deleteUserBlog,
  getAllBlogs,
  getUser,
  getUserBlogs,
  updateUserBlog,
} from "../usecases/userUseCases";

const user = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUser(id);
    console.log("user", user);
    if (user) {
      res.status(200).json({
        success: true,
        user,
        message: "user detials collected successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const createBlog = async (req: Request, res: Response) => {
  console.log("file", req.file);
  try {
    if (!req.file) {
      throw new Error("image is required");
    }

    const path = req.file?.path;
    const originName = req.file?.originalname;
    const fileName = req.file?.fieldname;

    const blogData = {
      ...req.body,
      imageUrl: {
        filename: fileName,
        originalname: originName,
        path: path,
      },
    };

    const blog = await createUserBlog(blogData);
    if (blog) {
      res
        .status(200)
        .json({ success: true, message: "Blog created successfully" });
    }
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(400).json({ success: false, error: errorMessage });
  }
};

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await getAllBlogs();
    if (blogs) {
      res
        .status(200)
        .json({ success: true, blogs, message: "Blogs fetched successfully" });
    }
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(400).json({ success: false, error: errorMessage });
  }
};

const getUsersBlogs = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blogs = await getUserBlogs(id);
    if (blogs) {
      res.status(200).json({
        success: true,
        blogs,
        message: "successfully feteched user blogs",
      });
    }
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(400).json({ success: false, error: errorMessage });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteUserBlog(id);
    if (response) {
      res
        .status(200)
        .json({ success: true, message: "Blog deleted successfully" });
    }
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(400).json({ success: false, error: errorMessage });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  console.log("file", req.file);
  console.log(req.body);
  try {
    let blogData;
    if (req.file) {
      const path = req.file?.path;
      const originName = req.file?.originalname;
      const fileName = req.file?.fieldname;

      blogData = {
        ...req.body,
        imageUrl: {
          filename: fileName,
          originalname: originName,
          path: path,
        },
      };
    } else {
      blogData = { ...req.body };
    }

    const blog = await updateUserBlog(blogData);
    if (blog) {
      res
        .status(200)
        .json({ success: true, message: "Blog created successfully" });
    }
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    res.status(400).json({ success: false, error: errorMessage });
  }
};

export default {
  user,
  createBlog,
  getBlogs,
  getUsersBlogs,
  deleteBlog,
  updateBlog,
};
