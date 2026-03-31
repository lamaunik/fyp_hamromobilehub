import express from "express";
import { getConversations, getMessages, sendMessage, deleteConversation, togglePinConversation } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All routes require authentication

router.route("/")
  .get(getConversations)
  .post(sendMessage);

router.route("/:conversationId")
  .get(getMessages)
  .delete(deleteConversation);

router.put("/:conversationId/pin", togglePinConversation);

export default router;
