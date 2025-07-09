import express from "express";
import { getMessage, postMessage } from "../controllers/MessageController.js";
import { validateMessage } from "../validation/validateMessage.js";

const router = express.Router();

router.get("/message", getMessage);
router.post("/message", validateMessage(), postMessage);

export default router;
