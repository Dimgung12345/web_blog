import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import popularityRoutes from "./routes/popularityRoutes.js";
import userlikeRoutes from "./routes/userlikeRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const BASE_PATH = "/blog";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.locals.BASE_PATH = BASE_PATH;
  res.locals.formatDate = (date, opts) => date ? new Date(date).toLocaleDateString('id-ID', opts) : '-';
  next();
});

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${BASE_PATH}/storage`, express.static("storage"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.redirect(BASE_PATH));

// API routes
app.use(`${BASE_PATH}/api/posts`, postRoutes);
app.use(`${BASE_PATH}/api/users`, userRoutes);
app.use(`${BASE_PATH}/api/media`, mediaRoutes);
app.use(`${BASE_PATH}/api/categories`, categoryRoutes);
app.use(`${BASE_PATH}/api/popularity`, popularityRoutes);
app.use(`${BASE_PATH}/api/likes`, userlikeRoutes);

// Page Routes (SSR)
app.use(BASE_PATH, pageRoutes);

app.use((req, res) => {
  res.status(404).render("pages/public/404");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
