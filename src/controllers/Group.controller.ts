// controllers/Group.controller.ts
import { Request, Response } from "express";
import Group from "../models/Group.model";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, isPublic } = req.body;
    const admin = req.body.admin; // Assuming userId is set from authentication middleware
    console.log(admin, "admin");
    const newGroup = new Group({
      name,
      admin,
      isPublic,
      members: [admin],
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPublicGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find({ isPublic: true });
    res.json(groups);
  } catch (error) {
    console.error("Error fetching public groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserGroups = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const groups = await Group.find({ members: userId });
    res.json(groups);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.body;
    const userId = req.body.userId; // From auth middleware

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.json({ message: "Joined group successfully" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
