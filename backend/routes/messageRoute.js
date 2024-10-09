import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Ensure this is implemented correctly
import { getMessage, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// Define the route for sending a message, ensuring the user is authenticated first
router.route("/send/:id").post(isAuthenticated, sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);

// Export the router to be used in your main app
export default router;
