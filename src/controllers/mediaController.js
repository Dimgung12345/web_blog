import db from "../../models/index.js";
const { Media, Post } = db;

// Create media
export const create = async (req, res) => {
  try {
    const { type, caption, PostId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Simpan path relatif ke storage
    const url = `/storage/${type}/${req.file.filename}`;

    const media = await Media.create({ url, type, caption, PostId });
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all media
export const index = async (req, res) => {
  try {
    const mediaList = await Media.findAll({ include: Post });
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get media by ID
export const show = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id, { include: Post });
    if (!media) return res.status(404).json({ error: "Media not found" });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update media
export const update = async (req, res) => {
  try {
    const { url, type, caption, PostId } = req.body;
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    await media.update({ url, type, caption, PostId });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete media
export const destroy = async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    await media.destroy();
    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
