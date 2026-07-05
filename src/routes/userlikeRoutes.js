import express from 'express';
import * as userlikeController from '../controllers/userlikeController.js';
import { sessionMiddleware } from "../middleware/session.js";

const router = express.Router();

router.get("/trending", userlikeController.getTrending);
router.get("/:postId/count", userlikeController.getLikesCount);
router.get("/:postId/check", sessionMiddleware, userlikeController.checkUserLike);
router.post("/:postId/toggle", sessionMiddleware, userlikeController.toggleLike);

export default router;
