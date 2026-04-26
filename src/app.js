import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import SSRRoutes from "./routes/SSRRoutes.js";

// utils untuk database dan .env
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// utils untuk file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// utils API
app.use(cors());
app.use(express.json());
app.use("/storage", express.static("storage"));
// utils ssr
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// SSR routes
app.use("/", SSRRoutes);

// API routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
