import express from "express";
const router = express.Router();

import validateLogin from "../validation/validateLogin.js";
import {
  getAllDataRegister,
  getAllDataUsers,
  postDataRegister,
  postDataUsers,
} from "../models/usersModels.js";
import { validateRegister } from "../validation/validateRegister.js";

router.get("/login", getAllDataUsers);
router.post("/login", validateLogin(), postDataUsers);
router.get("/register", getAllDataRegister);
router.post("/register", validateRegister(), postDataRegister);

export default router;
