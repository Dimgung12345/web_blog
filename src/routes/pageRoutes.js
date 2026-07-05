import express, { response } from "express";
import db from "../../models/index.js";
import { login } from "../controllers/userController.js";
import * as postSSRController from "../controllers/postSSRController.js";
import { sessionMiddleware, destroySession, clearAllSessions } from "../middleware/session.js"

const { Post, Category, User } = db;
const router = express.Router();

// Category color mapping
const catColors = {
    'Technology': { bg: '#0069ff', text: '#fff' },
    'Science': { bg: '#8b5cf6', text: '#fff' },
    'Design': { bg: '#ec4899', text: '#fff' },
    'Programming': { bg: '#10b981', text: '#fff' },
    'AI & Machine Learning': { bg: '#f43f5e', text: '#fff' },
    'Web Development': { bg: '#06b6d4', text: '#fff' },
    'Mobile Apps': { bg: '#84cc16', text: '#fff' },
    'DevOps': { bg: '#6366f1', text: '#fff' },
    'Cybersecurity': { bg: '#64748b', text: '#fff' },
    'Cloud Computing': { bg: '#3b82f6', text: '#fff' },
    'Data Science': { bg: '#f97316', text: '#fff' },
    'Blockchain': { bg: '#ef4444', text: '#fff' },
    'UX Research': { bg: '#a855f7', text: '#fff' },
    'Startup': { bg: '#22c55e', text: '#fff' },
    'Productivity': { bg: '#14b8a6', text: '#fff' },
    'Open Source': { bg: '#65a30d', text: '#fff' },
    'Database': { bg: '#78716c', text: '#fff' },
    'API Design': { bg: '#0ea5e9', text: '#fff' },
    'Testing': { bg: '#ea580c', text: '#fff' },
    'Career': { bg: '#d946ef', text: '#fff' },
    'Tech': { bg: '#0069ff', text: '#fff' },
    'Sains': { bg: '#8b5cf6', text: '#fff' },
    'General': { bg: '#475569', text: '#fff' }
};

const catColor = (name) => {
    return (catColors[name] || catColors['General']).bg;
};

router.use((req, res, next) => {
    res.locals.catColor = catColor;
    next();
});

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
        res.render("pages/public/home", { posts, categories, isLandingPage: true, catColor });
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
        res.render("pages/public/categories", { categories, catColor });
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
