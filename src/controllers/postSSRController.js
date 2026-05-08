import db from "../../models/index.js";
import { marked } from "marked";

const { Post, Category, User } = db;

const renderer = new marked.Renderer();
renderer.heading = ({ text, depth }) => {
    const id = text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

    if (depth >= 1 && depth <= 3) {
        return `<h${depth} id="${id}">${text}</h${depth}>`;
    }
    return `<h${depth}>${text}</h${depth}>`;
};
marked.setOptions({ renderer });

const extractHeaders = (content) => {
    const headers = [];
    const regex = /^(#{1,3})\s+(.*)$/gm;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        headers.push({ level, text, id });
    }

    return headers;
};

export const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { slug: req.params.slug },
            include: [
                { model: Category },
                { model: User, attributes: ['username', 'id'] }
            ]
        });

        if (!post) {
            if (req.headers.accept && req.headers.accept.includes("json")) {
                return res.status(404).json({ error: "Post tidak ditemukan" });
            }
            return res.status(404).render("pages/public/404");
        }

        if (req.headers.accept && req.headers.accept.includes("json")) {
            return res.json(post);
        }

        const contentHtml = marked.parse(post.content || "");
        const toc = extractHeaders(post.content || "");

        const relatedPosts = await Post.findAll({
            where: {
                CategoryId: post.CategoryId,
                id: { [db.Sequelize.Op.ne]: post.id }
            },
            limit: 3,
            order: [['createdAt', 'DESC']]
        });

        const categories = await Category.findAll();
        const readingTime = Math.ceil((post.content || "").split(/\s+/).length / 200);

        res.render("pages/public/post-detail", {
            post,
            contentHtml,
            toc,
            relatedPosts,
            categories,
            readingTime
        });
    } catch (err) {
        console.error("Error loading post:", err);
        res.status(500).render("pages/public/404");
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const isJson = req.headers.accept && req.headers.accept.includes("json");

        const posts = await Post.findAll({
            attributes: isJson ? { exclude: ['content'] } : undefined,
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });

        if (isJson) {
            return res.json(posts);
        }

        const categories = await Category.findAll();

        res.render("pages/public/home", {
            posts,
            featuredPost: null,
            categories,
            isLandingPage: false,
            title: "Semua Artikel - eBlog-RPL"
        });
    } catch (err) {
        res.status(500).render("pages/public/404");
    }
};