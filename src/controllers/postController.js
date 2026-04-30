import db from "../../models/index.js";
const { Post, Category, Sequelize } = db;

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, CategoryId, pathID } = req.body;
    const slug = generateSlug(title);

    const newPost = await db.Post.create({
      title,
      slug,
      content,
      CategoryId,
      pathID,
      UserId: req.user.id   // ambil dari token
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchPosts = async (req, res) => {
  const asd = req.query.q; // ambil keyword dari query string ?q=...
  console.log("RIJAL - Search query:", asd);

  const posts = Post.findAll({
    where: {
      title: {
        [Sequelize.Op.iLike]: `%${asd}%`
      }
    }
  });
  res.json(posts);

};
// Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, content, author, CategoryId } = req.body;
    const slug = generateSlug(title);
    const [updated] = await Post.update(
      { title, content, slug, author, CategoryId },
      { where: { id: req.params.id } }
    );
    if (updated === 0) return res.status(404).json({ error: "Post tidak ditemukan" });

    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ error: "Post tidak ditemukan" });
    res.json({ message: "Post berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

