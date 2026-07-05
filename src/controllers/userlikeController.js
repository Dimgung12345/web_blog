import db from "../../models/index.js";

const { UserLike, Post } = db;

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const UserId = req.internalUserId;

    const existing = await UserLike.findOne({ where: { UserId, PostId: postId } });

    if (existing) {
      await existing.destroy();
      const count = await UserLike.count({ where: { PostId: postId } });
      return res.json({ liked: false, count, postId });
    }

    await UserLike.create({ UserId, PostId: postId });
    const count = await UserLike.count({ where: { PostId: postId } });
    res.json({ liked: true, count, postId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { postId } = req.params;
    const count = await UserLike.count({ where: { PostId: postId } });
    res.json({ count, postId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkUserLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const UserId = req.internalUserId;

    const existing = await UserLike.findOne({ where: { UserId, PostId: postId } });
    res.json({ liked: !!existing, postId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrending = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const trending = await UserLike.findAll({
      attributes: [
        "PostId",
        [db.sequelize.fn("COUNT", db.sequelize.col("PostId")), "likeCount"]
      ],
      include: [{ model: Post, attributes: ["id", "title", "slug"] }],
      group: ["PostId", "Post.id"],
      order: [[db.sequelize.literal("likeCount"), "DESC"]],
      limit: parseInt(limit)
    });

    const result = trending.map(item => ({
      postId: item.PostId,
      title: item.Post.title,
      slug: item.Post.slug,
      likes: parseInt(item.dataValues.likeCount)
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
