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
            return res.status(404).render("pages/public/404");
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
        const posts = await Post.findAll({
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        const categories = await Category.findAll();

        res.render("pages/public/home", {
            posts,
            categories,
            isLandingPage: false,
            title: "Semua Artikel - eBlog-RPL"
        });
    } catch (err) {
        res.status(500).render("pages/public/404");
    }
};

export const searchPosts = async (req, res) => {
    try {
        const { query } = req.query;
        const posts = await Post.findAll({
            where: {
                title: { [db.Sequelize.Op.iLike]: `%${query}%` },
            },
            include: [{ model: Category }, { model: User, attributes: ["username"] }],
            order: [["createdAt", "DESC"]],
        });
        const categories = await Category.findAll();
        res.render("pages/public/home", { 
            posts, 
            categories, 
            isLandingPage: false, 
            q: query, 
            title: `Hasil Pencarian: ${query}` 
        });
    } catch (err) {
        res.status(500).render("pages/public/404");
    }
};

export const getPostsByCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ where: { slug: req.params.categorySlug } });
        if (!category) return res.status(404).render("pages/public/404");

        const posts = await Post.findAll({
            where: { CategoryId: category.id },
            include: [{ model: Category }, { model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });
        const categories = await Category.findAll();
        res.render("pages/public/home", { 
            posts, 
            categories, 
            isLandingPage: false, 
            title: `Kategori: ${category.name}` 
        });
    } catch (err) {
        res.status(500).render("pages/public/404");
    }
};