import { validationResult } from "express-validator";
import db from "../config/connection.js";
import response from "../utils/response.js";

export const getAllDataUsers = (req, res) => {
  const sqlGetData = "SELECT * FROM users;";
  db.query(sqlGetData, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data");
  });
};

export const postDataUsers = (req, res) => {
  const result = validationResult(req);
  const receivedData = req.body;

  if (result.isEmpty()) {
    const sqlPostData = `INSERT INTO users (username, password) VALUES ("${receivedData.username}", "${receivedData.password}");`;
    return db.query(sqlPostData, (err, result) => {
      if (err) throw err;
      response(res, result, "Berhasil kirim data");
    });
  } else {
    return res.json({ errors: result.array() });
  }
};

export const getAllDataRegister = (req, res) => {
  const sqlGetData = "SELECT * FROM register;";
  return db.query(sqlGetData, (err, result) => {
    if (err) throw err;
    response(res, result, "Berhail mengambil data register");
  });
};

export const postDataRegister = (req, res) => {
  const receivedData = req.body;
  const result = validationResult(req);
  if (result.isEmpty()) {
    const sqlPostData = `INSERT INTO register (kk_number,fullname,phone,email,addres,password,repeat_password,birtdate,rekening,ktp_number,img_ktp,img_kk,img_ktp_person) VALUES (${receivedData.kk_number},"${receivedData.fullname}", ${receivedData.phone},"${receivedData.email}", "${receivedData.addres}","${receivedData.password}","${receivedData.repeat_password}", ${receivedData.birtdate}, "${receivedData.rekening}",${receivedData.ktp_number},"${receivedData.img_ktp}","${receivedData.img_kk}","${receivedData.img_ktp_person}");`;
    return db.query(sqlPostData, (err, result) => {
      if (err) throw err;
      response(res, result, "Berhasil mengirim data register");
    });
  }
  res.send("Something error", { errors: result.array().msg });
};
