import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import bundleRoutes from "./routes/bundles.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express());
app.use(bodyParser.json());

// Routes
app.use("/api/bundles", bundleRoutes);

// Start Server
//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
