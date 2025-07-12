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
import upload from "../middleware/upload.js";

router.get("/login", getAllDataUsers);
router.post("/login", validateLogin(), postDataUsers);

router.get("/register", getAllDataRegister);
router.post(
  "/register",
  upload.fields([
    { name: "img_ktp", maxCount: 1 },
    { name: "img_kk", maxCount: 1 },
    { name: "img_ktp_person", maxCount: 1 },
  ]),
  validateRegister(),
  postDataRegister
);

router.get("/user", getUserByName);
router.get("/userAll", getAllUser);
router.get("/userNik", getDataByNikUser);
router.patch("/userAll", updateDataUser);
router.delete("/userAll", deleteDataByNik);

export default router;
