import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import { setupSocketIO } from "./socket/socket.js"; // Import socket setup

dotenv.config();

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Create HTTP server and integrate with Express
const server = http.createServer(app);

// Set up Socket.IO using the HTTP server
setupSocketIO(server);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
