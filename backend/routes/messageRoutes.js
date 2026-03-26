import express from "express";
import { getConversations, getMessages, sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All routes require authentication

router.route("/")
  .get(getConversations)
  .post(sendMessage);

router.route("/:conversationId")
  .get(getMessages);

export default router;
