import express from "express";
import * as postController from "../controllers/postController.js";
import { sessionMiddleware } from "../middleware/session.js";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/search", postController.searchPosts);
router.get("/category/:categoryId", postController.getPostByCategory);
router.get("/:id", postController.getPostById);
router.get("/:slug", postController.getPostBySlug);
router.post("/", sessionMiddleware, postController.createPost);
router.put("/:id", sessionMiddleware, postController.updatePost);
router.delete("/:id", sessionMiddleware, postController.deletePost);

export default router;
