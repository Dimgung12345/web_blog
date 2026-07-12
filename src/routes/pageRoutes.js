import express, { response } from "express";
import db from "../../models/index.js";
import { login } from "../controllers/userController.js";
import * as postSSRController from "../controllers/postSSRController.js";
import { auth, destroySession, clearAllSessions } from "../middleware/session.js"

const { Post, Category, User } = db;
const router = express.Router();

const catColor = (name) => {
    if (!name) return '#475569';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 45%)`;
};

router.use((req, res, next) => {
    res.locals.catColor = catColor;
    next();
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']],
        });
        const categories = await Category.findAll();

        const trendingLikes = await db.UserLike.findAll({
            attributes: [
                'PostId',
                [db.Sequelize.fn('COUNT', db.Sequelize.col('PostId')), 'likecount']
            ],
            include: [{
                model: Post,
                include: [{ model: Category }, { model: User, attributes: ['username'] }]
            }],
            group: ['PostId', 'Post.id', 'Post->Category.id', 'Post->User.id'],
            order: [[db.Sequelize.literal('likecount'), 'DESC']],
            limit: 5
        });

        const trendingPosts = trendingLikes.map(tl => tl.Post).filter(Boolean);

        res.render("pages/public/home", { posts, categories, trendingPosts, isLandingPage: true, catColor });
    } catch (err) {
        res.status(500).send("Error loading home page: " + err.message);
    }
});

router.get("/posts", postSSRController.getAllPosts);

router.get("/search", postSSRController.searchPosts);

router.get("/posts/category/:categorySlug", postSSRController.getPostsByCategory);

router.get("/posts/:slug", postSSRController.getPostBySlug);

router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render("pages/public/categories", { categories, catColor });
    } catch (err) {
        res.status(500).render("pages/public/404");
    }
});

router.get("/register", (req, res) => res.render("pages/auth/register"));
router.get("/login", (req, res) => res.render("pages/auth/login"));
router.post("/login", login);
router.get("/admin", auth('admin', 'editor'), (req, res) => res.render("pages/admin/dashboard"));
router.get("/inspect", (req, res) => res.send(req.cookies))

router.post("/logout", (req, res) => {
    const sessionId = req.cookies.session_id;
    if (sessionId) {
        destroySession(sessionId);
        res.clearCookie("session_id", { path: "/" });
    }
    res.redirect("/blog/login");
});

router.post("/admin/clear-sessions", auth('admin'), (req, res) => {
    clearAllSessions();
    res.clearCookie("session_id", { path: "/" });
    res.json({ message: "All sessions cleared" });
});

export default router;
