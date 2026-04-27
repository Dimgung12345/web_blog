import express from "express";
import db from "../../models/index.js";
import { login } from "../controllers/userController.js";

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

router.get("/admin", (req, res) => {
    res.render("pages/admin/dashboard");
});

router.get("/login", (req, res) => {
    res.render("pages/auth/login");
});

router.post("/login", login);

export default router;
