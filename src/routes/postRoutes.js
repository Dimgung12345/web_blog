import express from "express";
import * as postController from "../controllers/postController.js";
import { auth } from "../middleware/session.js";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.get("/search", postController.searchPosts);
router.get("/:slug", postController.getPostBySlug);
router.get("/category/:categoryId", postController.getPostByCategory);
router.post("/", auth('admin', 'editor'), postController.uploadThumbnail, postController.createPost);
router.put("/:id", auth('admin', 'editor'), postController.uploadThumbnail, postController.updatePost);
router.delete("/:id", auth('admin'), postController.deletePost);

export default router;
