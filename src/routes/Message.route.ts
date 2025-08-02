// routes/Message.route.ts
import express from "express";
import {
  sendMessage,
  getGroupMessages,
} from "../controllers/Message.controller";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/group/:groupId", getGroupMessages);

export default router;
