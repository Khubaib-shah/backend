import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoute from "./routes/auhtRoute.js";

const app = express();
dotenv.config();
dbConnect();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoute);
app.use("/", (req, res) => {
  req.status(200).json({
    message: "api is ok",
  });
  console.log("server is running");
});

// server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
