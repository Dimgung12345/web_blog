import express, { response } from "express";
import db from "../../models/index.js";
import { login } from "../controllers/userController.js";
import * as postSSRController from "../controllers/postSSRController.js";
import { sessionMiddleware, destroySession, clearAllSessions } from "../middleware/session.js"

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
router.get("/search", postSSRController.searchPosts);

// Category Detail Page (By Slug)
router.get("/posts/category/:categorySlug", postSSRController.getPostsByCategory);

// Post Detail Page (By Slug)
router.get("/posts/:slug", postSSRController.getPostBySlug);

// Categories List Page
router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render("pages/public/categories", { categories });
    } catch (err) {
        res.status(500).render("pages/public/404");
    }
});

/**
 * AUTH & ADMIN
 */
router.get("/login", (req, res) => res.render("pages/auth/login"));
router.post("/login", login);
router.get("/admin",  sessionMiddleware, (req, res) => res.render("pages/admin/dashboard"));
router.get("/inspect", (req, res) => res.send(req.cookies))

router.post("/logout", (req, res) => {
  const sessionId = req.cookies.session_id;
  if (sessionId) {
    destroySession(sessionId);
    res.clearCookie("session_id", { path: "/" });
  }
  res.redirect("/blog/login");
});

router.post("/admin/clear-sessions", sessionMiddleware, (req, res) => {
  if (!req.internalUserId) return res.status(401).json({ error: "Unauthorized" });
  clearAllSessions();
  res.clearCookie("session_id", { path: "/" });
  res.json({ message: "All sessions cleared" });
});

export default router;
