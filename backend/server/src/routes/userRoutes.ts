import express from "express";
import userController from "../controllers/userController";
import upload from "../services/multerService";

const router = express.Router();

router.get("/userData/:id", userController.user);

router.post(
  "/blogs/create",
  upload.single("imageUrl"),
  userController.createBlog
);

router.get("/blogs", userController.getBlogs);

router.get("/blogs/:id", userController.getUsersBlogs);

router.delete("/blogs/:id", userController.deleteBlog);

export default router;
