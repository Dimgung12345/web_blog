import express from "express";
import db from "../../models/index.js";
import { login } from "../controllers/userController.js";
import * as postSSRController from "../controllers/postSSRController.js";

const { Post, Category, User } = db;
const router = express.Router();

/**
 * SSR ROUTES (All prefixed with /blog via app.js)
 */

// Home Page
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
        });
        const categories = await Category.findAll();
        res.render("pages/public/home", { posts, categories, isLandingPage: true });
    } catch (err) {
        res.status(500).send("Error loading home page: " + err.message);
    }
});

// All Posts Page
router.get("/posts", postSSRController.getAllPosts);

// Search Page
router.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.findAll({
      where: {
        title: { [db.Sequelize.Op.iLike]: `%${query}%` },
      },
      include: [{ model: Category }, { model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    const categories = await Category.findAll();
    res.render("pages/public/home", { posts, categories, isLandingPage: false, q: query, title: `Search: ${query}` });
  } catch (err) {
    res.status(500).send("Error searching posts: " + err.message);
  }
});

// Category Detail Page (By Slug)
router.get("/posts/category/:categorySlug", async (req, res) => {
    try {
        const category = await Category.findOne({ where: { slug: req.params.categorySlug } });
        if (!category) return res.status(404).render("pages/public/404");
        
        const posts = await Post.findAll({
            where: { CategoryId: category.id },
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        const categories = await Category.findAll();
        res.render("pages/public/home", { posts, categories, isLandingPage: false, title: `Category: ${category.name}` });
    } catch (err) {
        res.status(500).send("Error loading category: " + err.message);
    }
});

// Post Detail Page (By Slug)
router.get("/posts/:slug", postSSRController.getPostBySlug);

// Categories List Page
router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (req.headers.accept && req.headers.accept.includes("json")) {
            return res.json(categories);
        }
        res.render("pages/public/categories", { categories });
    } catch (err) {
        if (req.headers.accept && req.headers.accept.includes("json")) {
            return res.status(500).json({ error: err.message });
        }
        res.status(500).send("Error loading categories: " + err.message);
    }
});

/**
 * AUTH & ADMIN
 */
router.get("/login", (req, res) => res.render("pages/auth/login"));
router.post("/login", login);
router.get("/admin", (req, res) => res.render("pages/admin/dashboard"));

export default router;
