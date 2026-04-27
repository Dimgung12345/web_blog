import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";

// utils untuk database dan .env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_PATH = "/blog";

// utils untuk file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// utils API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${BASE_PATH}/storage`, express.static("storage"));
// utils ssr
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Page Routes (SSR)
app.use(BASE_PATH, pageRoutes);

// API routes
app.use(`${BASE_PATH}/posts`, postRoutes);
app.use(`${BASE_PATH}/users`, userRoutes);
app.use(`${BASE_PATH}/media`, mediaRoutes);
app.use(`${BASE_PATH}/categories`, categoryRoutes);

// 404 not found kalo gada
app.use((req, res) => {
  res.status(404).render("pages/public/404");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
