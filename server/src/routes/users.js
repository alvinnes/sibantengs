import express from "express";
import { matchedData, validationResult } from "express-validator";
import {
  validateEmail,
  validateNumberPhone,
  validatePassword,
  validateUsername,
} from "../utils/validateInput.js";
const router = express.Router();

const data = {
  data: [],
};

// Ambil data
router.get("/", (req, res) => {
  console.log("Berhasil mengambil data");
  res.json(data);
});

// Kirim data
router.post(
  "/",
  validateUsername(),
  validateEmail(),
  validateNumberPhone(),
  validatePassword(),
  (req, res) => {
    console.log(req.body.phone);
    const result = validationResult(req);
    if (result.isEmpty()) {
      const dataInput = matchedData(req);
      const newData = data.data.push({
        ...dataInput,
        id: data.data.length + 1,
      });
      console.log(newData);
    }
    res.json({ errors: result.array() });
  }
);

export default router;
