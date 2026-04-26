// contoh routesnya untuk ssr
import express from "express";
import db from "../../models/index.js";

const router = express.Router();

// views/pages/post/hello.ejs
router.get("/hello", (req, res) => {
  res.render("pages/post/hello", { message: "Hello World dari SSR EJS!" });
});

// views/pages/post/list.ejs
router.get("/posts", async (req, res) => {
  const posts = await db.Post.findAll({ include: db.User });
  res.render("pages/post/list", { posts });
});

export default router;
