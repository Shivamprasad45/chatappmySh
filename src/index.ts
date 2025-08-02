// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/Auth.route";
// import http from "http";
// import { Server } from "socket.io";
// import { messagereciver } from "./controllers/Message";
// import Messagerouter from "./routes/MessageRoutes";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Adjust the origin as needed
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["Content-Type"],
//     exposedHeaders: ["Content-Type"],
//   },
// });

// // Middlewares
// // app.use(cors({ origin: "http://localhost:3000" })); // Adjust the origin as needed
// io.on("connection", (socket) => {
//   console.log("User connected ", socket.id);

//   socket.on("chat-message", async (msg) => {
//     try {
//       await messagereciver(msg);
//       socket.broadcast.emit("chat-message", msg);
//     } catch (error) {
//       console.error("Error saving message:", error);
//     }
//   });
// });
// app.use((req, res, next) => {
//   console.log(`${req.url}`);
//   next();
// });
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000" }));
// app.use("/api/message", Messagerouter);
// // Routes
// app.use("/api/auth", authRoutes);

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // MongoDB Connection
// mongoose
//   .connect(
//     "mongodb+srv://shivamGond:Mmfdv2UuHK9LVAjS@cluster0.y7agcqc.mongodb.net/bchat?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("MongoDB connected");
//     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
// Updated server file (index.ts)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/Auth.route";
import http from "http";
import { Server } from "socket.io";
import GroupRouter from "./routes/Group.route";
import MessageRouter from "./routes/Message.route";
// import { authenticate } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join group room
  socket.on("join-group", (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group ${groupId}`);
  });

  // Leave group room
  socket.on("leave-group", (groupId) => {
    socket.leave(groupId);
    console.log(`User ${socket.id} left group ${groupId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Add io instance to request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/groups", GroupRouter);
app.use("/api/messages", MessageRouter);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://shivamGond:Mmfdv2UuHK9LVAjS@cluster0.y7agcqc.mongodb.net/bchat?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
