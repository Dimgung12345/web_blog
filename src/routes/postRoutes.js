import express from "express";
import * as postController from "../controllers/postController.js";
import { auth } from "../middleware/session.js";

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/search", postController.searchPosts);
router.get("/category/:categoryId", postController.getPostByCategory);
router.get("/:id", postController.getPostById);
router.get("/:slug", postController.getPostBySlug);

router.post("/", auth('admin', 'editor'), postController.uploadThumbnail, postController.createPost);
router.put("/:id", auth('admin', 'editor'), postController.uploadThumbnail, postController.updatePost);
router.delete("/:id", auth('admin'), postController.deletePost);

export default router;
