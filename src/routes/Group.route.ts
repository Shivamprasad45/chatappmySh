// routes/Group.route.ts
import express from "express";
import {
  createGroup,
  getPublicGroups,
  getUserGroups,
  joinGroup,
} from "../controllers/Group.controller";

const router = express.Router();

router.post("/create", createGroup);
router.get("/public", getPublicGroups);
router.get("/user/:userId", getUserGroups);
router.post("/join", joinGroup);

export default router;
