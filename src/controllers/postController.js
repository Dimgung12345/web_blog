import db from "../../models/index.js";
const { Post, Category } = db;

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, CategoryId, pathID } = req.body;

    const newPost = await db.Post.create({
      title,
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


// Get All Posts
export const getAllPosts = async (req, res) => {
  try {
    const data = await Post.findAll({ include: [Category] });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: [Category] });
    if (!post) return res.status(404).json({ error: "Post tidak ditemukan" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Post by Category
export const getPostByCategory = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { CategoryId: req.params.categoryId },
      include: [Category]
    });
    if (posts.length === 0) {
      return res.status(404).json({ error: "Post tidak ditemukan untuk kategori ini" });
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, content, author, CategoryId } = req.body;
    const [updated] = await Post.update(
      { title, content, author, CategoryId },
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
