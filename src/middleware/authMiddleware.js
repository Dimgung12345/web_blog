import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Fokus untuk admin nih ye
  const linuxRijal = req.cookies.linux_rijal
  if(!linuxRijal) return res.redirect("/blog/login")
  const token = linuxRijal;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};