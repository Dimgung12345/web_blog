import bcrypt from "bcrypt";
import db from "../../models/index.js";
import { generateToken } from "../middleware/authMiddleware.js";

const { User } = db;

// Register User
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validasi input sederhana
    if (!username || !password) {
      return res.status(400).json({ error: "Username dan password wajib diisi" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke DB
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "admin", // default role admin kalau tidak diisi
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Validasi password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Password salah" });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.json({ data: { token } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
