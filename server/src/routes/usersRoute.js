import express from "express";
const router = express.Router();

import validateLogin from "../validation/validateLogin.js";
import { validateRegister } from "../validation/validateRegister.js";
import {
  deleteDataByNik,
  getAllDataRegister,
  getAllUser,
  getDataByNikUser,
  getUserByName,
  postDataRegister,
  updateDataUser,
} from "../controllers/UserController.js";
import {
  getAllDataUsers,
  postDataUsers,
} from "../controllers/UserLoginController.js";

router.get("/login", getAllDataUsers);
router.post("/login", validateLogin(), postDataUsers);
router.get("/register", getAllDataRegister);
router.post("/register", validateRegister(), postDataRegister);

router.get("/user", getUserByName);
router.get("/userAll", getAllUser);
router.get("/userNik", getDataByNikUser);
router.patch("/userAll", updateDataUser);
router.delete("/userAll", deleteDataByNik);

export default router;
