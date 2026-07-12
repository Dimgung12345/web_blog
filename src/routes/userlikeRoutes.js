import express from 'express';
import * as userlikeController from '../controllers/userlikeController.js';
import { auth } from "../middleware/session.js";

const router = express.Router();

router.get("/trending", userlikeController.getTrending);
router.get("/:postId/count", userlikeController.getLikesCount);
router.get("/:postId/check", auth('authenticated', 'editor', 'admin'), userlikeController.checkUserLike);
router.post("/:postId/toggle", auth('authenticated', 'editor', 'admin'), userlikeController.toggleLike);

export default router;
