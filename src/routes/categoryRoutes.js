import express from "express";
import * as categoryController from "../controllers/categoryController.js";
import { sessionMiddleware } from "../middleware/session.js";

const router = express.Router();

router.post("/", sessionMiddleware, categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/slug/:slug", categoryController.getCategoryBySlug);
router.delete("/:id", categoryController.deleteCategory);

export default router;
