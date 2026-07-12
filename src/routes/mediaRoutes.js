import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import * as mediaController from "../controllers/mediaController.js";
import { auth } from "../middleware/session.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root storage folder
const storageRoot = path.join(__dirname, "../../storage");

// Pastikan folder image & video ada
["image", "video"].forEach((sub) => {
  const dir = path.join(storageRoot, sub);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Konfigurasi multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // pakai req.body.type untuk tentukan folder
    const targetDir = path.join(storageRoot, req.body.type);
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", auth('admin', 'editor'), upload.single("file"), mediaController.create);
router.put("/:id", auth('admin'), upload.single("file"), mediaController.update);
router.delete("/:id", auth('admin'), mediaController.destroy);

export default router;
