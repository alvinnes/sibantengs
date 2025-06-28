import express from "express";
const router = express.Router();

import {
  validatePassword,
  validateUsername,
} from "../validation/validateInput.js";
import { matchedData, validationResult } from "express-validator";
import db from "../config/connection.js";
import response from "../utils/response.js";

// Ambil data
router.get("/", (req, res) => {
  const sqlGetData = "SELECT * FROM users;";
  db.query(sqlGetData, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data");
  });
});

// Kirim data
router.post("/", validateUsername(), validatePassword(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const dataInput = matchedData(req);
    const sqlPostData = `INSERT INTO users (username, password) VALUES ("${dataInput.username}", "${dataInput.password}");`;
    db.query(sqlPostData, (err, result) => {
      response(res, result, "Berhasil kirim data");
    });
  } else {
    res.json({ errors: result.array() });
  }
});

export default router;
