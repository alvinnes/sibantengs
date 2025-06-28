import { matchedData, validationResult } from "express-validator";
import db from "../config/connection";

export const getAllDataUsers = (req, res) => {
  const sqlGetData = "SELECT * FROM users;";
  return db.query(sqlGetData, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data");
  });
};

export const postDataUsers = (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const dataInput = matchedData(req);
    const sqlPostData = `INSERT INTO users (username, password) VALUES ("${dataInput.username}", "${dataInput.password}");`;
    return db.query(sqlPostData, (err, result) => {
      response(res, result, "Berhasil kirim data");
    });
  } else {
    return res.json({ errors: result.array() });
  }
};
