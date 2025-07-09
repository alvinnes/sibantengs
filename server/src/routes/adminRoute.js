import express from "express";
import {
  getDataAdmin,
  getDataByNikAdmin,
  updateAdmin,
} from "../controllers/AdminController.js";

const router = express.Router();

router.get("/admin", getDataAdmin);
router.get("/userNikAdmin", getDataByNikAdmin);
router.patch("/admin", updateAdmin);

export default router;
