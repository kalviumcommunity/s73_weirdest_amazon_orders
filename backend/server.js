import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Default route
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "You have accessed!", userId: req.user.id });
  });

// To start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
