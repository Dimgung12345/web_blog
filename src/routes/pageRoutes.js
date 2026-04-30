import express from "express";
import db from "../../models/index.js";
import { login } from "../controllers/userController.js";
import * as postSSRController from "../controllers/postSSRController.js";

const { Post, Category, User } = db;
const router = express.Router();

// Landing page
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
            limit: 5
        });
        
        const categories = await Category.findAll();
        res.render("pages/public/home", { posts, categories, isLandingPage: true });
    } catch (err) {
        res.status(500).send("Error loading home page: " + err.message);
    }
});

router.get("/search", async (req, res) => {
  const { query } = req.query; // ambil keyword dari query string ?q=...
  try {
    const posts = await Post.findAll({
      where: {
        title: { [db.Sequelize.Op.iLike]: `%${query}%` }, // case-insensitive search
      },
      include: [{ model: Category }, { model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });

    const categories = await Category.findAll();
    res.render("pages/public/searchResults", { posts, categories, q: query });
  } catch (err) {
    res.status(500).send("Error searching posts: " + err.message);
  }
// All Posts page
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        
        const categories = await Category.findAll();
        res.render("pages/public/home", { posts, categories, isLandingPage: false, title: 'Semua Postingan' });
    } catch (err) {
        res.status(500).send("Error loading posts page: " + err.message);
    }
});

// Categories list page
router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render("pages/public/categories", { categories });
    } catch (err) {
        res.status(500).send("Error loading categories page: " + err.message);
    }
});

router.get("/admin", (req, res) => {
    res.render("pages/admin/dashboard");
});

router.get("/login", (req, res) => {
    res.render("pages/auth/login");
});

router.get("/posts/:slug", async (req, res) => {
  const post = await Post.findOne({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).render("pages/public/404");
  res.render("pages/public/post-detail", { post });
});

router.post("/login", login);

router.get("/", postSSRController.getAllPosts);
router.get("/:id", postSSRController.getPostById);
router.get("/category/:categoryId", postSSRController.getPostByCategory);
router.get("/slug/:slug", postSSRController.getPostBySlug);
router.get("/posts/:slug", async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { slug: req.params.slug },
            include: [{ model: Category }, { model: User, attributes: ['username'] }]
        });
        
        if (!post) {
            return res.status(404).render("pages/public/404");
        }
        
        res.render("pages/public/post-detail", { post });
    } catch (err) {
        res.status(500).send("Error loading post: " + err.message);
    }
});

router.get("/posts/category/:categorySlug", async (req, res) => {
    try {
        const category = await Category.findOne({ where: { slug: req.params.categorySlug } });
        if (!category) {
            return res.status(404).render("pages/public/404");
        }
        
        const posts = await Post.findAll({
            where: { CategoryId: category.id },
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        
        const categories = await Category.findAll();
        res.render("pages/public/home", { posts, categories, isLandingPage: false });
    } catch (err) {
        res.status(500).send("Error loading category page: " + err.message);
    }
});

export default router;
