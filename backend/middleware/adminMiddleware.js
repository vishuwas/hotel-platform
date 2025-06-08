const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: Admin access required" });
    }

    req.user = decoded; // includes userId and role
    next();
  } catch (err) {
    console.error("Admin middleware error:", err.message);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = adminMiddleware;
