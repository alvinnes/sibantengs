import response from "../utils/response.js";
import db from "../config/connection.js";
import { validationResult } from "express-validator";

export const getMessage = (req, res) => {
  const sqlGetMessage = "SELECT * FROM ??";
  db.query(sqlGetMessage, ["message"], (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil pesan user");
  });
};

export const postMessage = (req, res) => {
  const receivedData = req.body;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(500).send({ errors: result.array() });
  }
  console.log(receivedData);
  const sqlPostMessage = `INSERT INTO message (fullname, email, phone, message) VALUES ("${receivedData.fullname}", "${receivedData.email}", ${receivedData.phone}, "${receivedData.message}");`;
  db.query(sqlPostMessage, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengirim pesan user");
  });
};
