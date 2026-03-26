import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

// @desc    Get all conversations for a user
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "name email profilePicture")
      .sort({ updatedAt: -1 });

    res.json({ success: true, count: conversations.length, data: conversations });
  } catch (error) {
    console.error("Error in getConversations:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get messages for a conversation
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .populate("sender", "name profilePicture")
      .sort({ createdAt: 1 });
    
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Create or get a conversation, and send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    let conversationId = req.body.conversationId;

    if (!conversationId) {
      if (!receiverId) return res.status(400).json({ success: false, message: "Receiver ID is required to start a chat." });

      // Check if conversation already exists
      let conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, receiverId] }
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [req.user._id, receiverId],
        });
      }
      conversationId = conversation._id;
    }

    const message = await Message.create({
      conversationId: conversationId,
      sender: req.user._id,
      text,
    });

    // Update conversation lastMessage
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      updatedAt: Date.now()
    });

    res.status(201).json({ success: true, data: message, conversationId });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
