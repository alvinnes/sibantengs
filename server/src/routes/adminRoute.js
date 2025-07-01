import express from "express";
import db from "../config/connection.js";
import response from "../utils/response.js";

const router = express.Router();

router.get("/admin", (req, res) => {
  const sql = "SELECT * FROM admin;";
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data admin");
  });
});

export default router;
