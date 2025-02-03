import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import userController from "../controllers/userController";
import upload from "../services/multerService";

const router = express.Router();

router.get("/userData/:id", authMiddleware, userController.user);

router.post(
  "/blogs/create",
  authMiddleware,
  upload.single("imageUrl"),
  userController.createBlog
);

router.get("/blogs", userController.getBlogs);

router.get("/blogs/:id", authMiddleware, userController.getUsersBlogs);

router.delete("/blogs/:id", authMiddleware, userController.deleteBlog);

router.put(
  "/blogs",
  authMiddleware,
  upload.single("imageUrl"),
  userController.updateBlog
);

export default router;
