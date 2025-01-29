import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/userData/:id", userController.user);

export default router;
