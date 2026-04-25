import db from "../../models/index.js";
const { Category, Post } = db;

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nama kategori wajib diisi" });

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Category by ID + Posts
export const getCategoryWithPosts = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Post }]
    });
    if (!category) return res.status(404).json({ error: "Kategori tidak ditemukan" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const [updated] = await Category.update({ name }, { where: { id: req.params.id } });
    if (updated === 0) return res.status(404).json({ error: "Kategori tidak ditemukan" });

    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ error: "Kategori tidak ditemukan" });
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
