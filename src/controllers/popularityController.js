// @deprecated Use userlikeController instead. Views feature replaced by per-user likes.
import db from "../../models/index.js";

const { Popularity, Post } = db;

// Ambil semua data Popularity
export const getPopularity = async (req, res) => {
  try {
    const popularity = await Popularity.findAll({
      include: { model: Post, attributes: ["id", "title", "slug"] }
    });
    res.json(popularity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil Popularity berdasarkan PostId
export const getPopularityByPostId = async (req, res) => {
  try {
    const stats = await Popularity.findOne({
      where: { PostId: req.params.postId },
      include: { model: Post, attributes: ["id", "title", "slug"] }
    });
    if (!stats) {
      return res.status(404).json({ message: "Belum ada View untuk post ini" });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment views
export const viewSum = async (req, res) => {
  try {
    const { postId } = req.params;

    let stats = await Popularity.findOne({ where: { PostId: postId } });
    if (!stats) {
      stats = await Popularity.create({ PostId: postId, views: 0 });
    }
    await stats.increment("views");
    await stats.reload(); // refresh data setelah increment
    res.json({
      message: "View count updated",
      postId,
      views: stats.views
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ambil daftar trending berdasarkan views terbanyak
export const getTrending = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const trendingPosts = await Popularity.findAll({
      include: [{ model: Post, attributes: ["id", "title", "slug"] }],
      order: [["views", "DESC"]],
      limit: parseInt(limit)
    });
    const result = trendingPosts.map(item => ({
      postId: item.Post.id,
      title: item.Post.title,
      slug: item.Post.slug,
      views: item.views
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
