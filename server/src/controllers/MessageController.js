import response from "../utils/response.js";
import responseMainData from "../utils/responseMainData.js";
import db from "../config/connection.js";
import { validationResult } from "express-validator";

export const getMessage = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  const countRows = "SELECT COUNT(*) as total FROM message;";
  const sqlGetData = "SELECT * FROM ?? LIMIT ? OFFSET ?;";

  db.query(countRows, (err, result) => {
    if (err) return res.status(500).json({ error: "Terjadi kesalahan" });
    const totalRows = result[0].total;
    const totalPage = Math.ceil(totalRows / limit);

    db.query(sqlGetData, ["message", limit, offset], (err, result) => {
      if (err) return res.status(500).json("Terjadi kesalahan");
      responseMainData(
        res,
        result,
        { totalPage, page, totalData: totalRows },
        "Berhasil mengambil data pesan"
      );
    });
  });
};

export const postMessage = (req, res) => {
  const receivedData = req.body;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(500).json({ errors: result.array() });
  }
  const sqlPostMessage = `INSERT INTO message (fullname, email, phone, message) VALUES ("${receivedData.fullname}", "${receivedData.email}", ${receivedData.phone}, "${receivedData.message}");`;
  db.query(sqlPostMessage, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengirim pesan user");
  });
};

export const searchMessage = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  const countRows = "SELECT COUNT(*) as total FROM message;";
  const sqlGetData = "SELECT * FROM ?? WHERE ?? LIKE ? LIMIT ? OFFSET ?;";

  db.query(countRows, (err, result) => {
    if (err) throw err;

    const totalRows = result[0].total;
    const totalPage = Math.ceil(totalRows / limit);

    db.query(
      sqlGetData,
      ["message", "fullname", `%${req.query.q}%`, limit, offset],
      (err, result) => {
        if (err) return res.status(404).json({ error: "Data tidak ditemukan" });
        responseMainData(
          res,
          result,
          { totalPage, page, totalData: totalRows },
          "Berhasil mencari data"
        );
      }
    );
  });
};

export const deleteMessage = (req, res) => {
  const date = new Date(req.query.date);
  const sqlDeleteData = "DELETE FROM ?? WHERE ?? IN (?)";

  db.query(sqlDeleteData, ["message", "created_at", date], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal menghapus data" });
    response(res, result, "Berhasil menghapus pesan");
  });
};

export const deleteAllMessage = (req, res) => {
  const sqlDeleteAll = "TRUNCATE TABLE ??;";
  db.query(sqlDeleteAll, ["message"], (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil menghapus semua data");
  });
};

export const getMessageById = (req, res) => {
  const date = new Date(req.query.created_at);
  const sql = "SELECT * FROM ?? WHERE ?? = ?";
  db.query(sql, ["message", "created_at", date], (err, result) => {
    if (err) return res.status(400).json({ errors: "Gagal mengambil data" });
    response(res, result, "Berhasil mengambil data");
  });
};
