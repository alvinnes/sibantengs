import express from "express";
import {
  getDataAdmin,
  getDataByNikAdmin,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/admin", getDataAdmin);
router.get("/userNikAdmin", getDataByNikAdmin);

export default router;
