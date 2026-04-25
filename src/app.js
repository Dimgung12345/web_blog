import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pathRoutes from "./routes/mediaRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/storage", express.static("storage"));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/paths", pathRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
