import db from "../../models/index.js";
const { Post, Category, Sequelize } = db;

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const toSlug = (text) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// Get All Posts (API)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: Category },
        { model: db.User, attributes: ["username"] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, CategoryId, pathID } = req.body;
    const slug = toSlug(title)
    const newPost = await db.Post.create({
      title,
      slug,
      content,
      CategoryId,
      pathID,
      slug,
      UserId: req.user.id // ambil dari token
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchPosts = async (req, res) => {
  const asd = req.query.q; // ambil keyword dari query string ?q=...
  console.log("RIJAL - Search query:", asd);

  const posts = await Post.findAll({
    where: { title: { [Sequelize.Op.iLike]: `%${asd}%` } }
  });
  res.json(posts);
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        slug: req.params.slug
      },
      include: [
        { model: Category },
        { model: db.User, attributes: ["username"] }
      ]
    })
    if (!post) return res.status(404).render("pages/public/404");

    res.render("pages/public/post-detail", { post });
  } catch (err) {
    res.render("pages/public/404")
  }
};

export const getPostByCategory = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { CategoryId: req.params.categoryId },
      include: [
        { model: Category },
        { model: db.User, attributes: ["username"] }
      ],
      order: [['createdAt', 'DESC']]
    });

    const categories = await Category.findAll();

    res.render("pages/public/home", {
      posts,
      categories,
      isLandingPage: false,
      title: "Kategori - Blog"
    });
  } catch (err) {
    res.status(500).render("pages/public/404");
  }
};
// Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, content, CategoryId } = req.body;
    const updateData = { title, content, CategoryId };

    if (title) {
      updateData.slug = toSlug(title);
    }

    const [updated] = await Post.update(
      updateData,
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