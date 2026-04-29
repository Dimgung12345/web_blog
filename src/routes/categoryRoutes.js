import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/slug/:slug", categoryController.getCategoryBySlug);

export default router;