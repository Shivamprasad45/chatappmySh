import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/Auth.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: "http://localhost:3000" })); // Adjust the origin as needed
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://shivamGond:Mmfdv2UuHK9LVAjS@cluster0.y7agcqc.mongodb.net/bchat?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
