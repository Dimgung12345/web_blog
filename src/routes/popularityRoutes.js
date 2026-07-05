// @deprecated Use userlikeRoutes instead. Views feature replaced by per-user likes.
import express from 'express';
import * as popularityController from '../controllers/popularityController.js';
const router = express.Router();

router.get("/", popularityController.getPopularity);
router.get("/:postId", popularityController.getPopularityByPostId);
router.patch("/:postId/view", popularityController.viewSum);
router.get("/trending/list", popularityController.getTrending);

export default router;