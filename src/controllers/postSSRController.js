import db from "../../models/index.js";
const { Post, Category } = db;

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ 
      include: [
        { model: Category },
        { model: db.User, attributes: ["username"] }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    if (req.headers.accept && req.headers.accept.includes("json")) {
      if (posts.length === 0) return res.json({ message: "Belum ada postingan" });
      return res.json(posts);
    }
    
    const categories = await Category.findAll();
    res.render("pages/public/home", { 
      posts, 
      categories, 
      isLandingPage: false,
      title: "Semua Postingan - Blog" 
    });
  } catch (err) {
    res.status(500).render("pages/public/404");
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { 
      include: [
        { model: Category },
        { model: db.User, attributes: ["username"] }
      ] 
    });
    if (!post) return res.status(404).render("pages/public/404");
    
    res.render("pages/public/post-detail", { post });
  } catch (err) {
    res.status(500).render("pages/public/404");
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

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug },
      include: [
        { model: Category },
        { model: db.User, attributes: ["username"] }
      ]
    });
    if (!post) return res.status(404).render("pages/public/404");
} catch (err) {
    res.status(500).render("pages/public/404");
  }
  res.render("pages/public/post-detail", { post });
};

// controller (SSR)
export const listPage = async (req, res) => {
  try {
    const posts = await db.Post.findAll({ include: db.User });
    // Perbedaanya pakai res.render Kalau lu liat keatas semua nya res.json karena controller API
    res.render("pages/posts/list", { posts });
  } catch (err) {
    res.status(500).send(err.message);
  }
};