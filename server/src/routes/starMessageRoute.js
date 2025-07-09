import express from "express";
import {
  getStarMessage,
  postStarMessage,
} from "../controllers/StarMessageController.js";

const router = express.Router();

router.get("/starMessage", getStarMessage);
router.post("/starMessage", postStarMessage);

export default router;
