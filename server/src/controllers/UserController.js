import { validationResult } from "express-validator";
import db from "../config/connection.js";
import response from "../utils/response.js";
import responseMainData from "../utils/responseMainData.js";

export const getAllDataRegister = (req, res) => {
  const sqlGetData = "SELECT * FROM register;";
  const sqlGetTotalData = "SELECT COUNT(*) as total FROM ??;";
  db.query(sqlGetTotalData, ["register"], (err, result) => {
    const totalData = result[0].total;

    db.query(sqlGetData, (err, result) => {
      if (err) throw err;
      response(res, result, totalData, "Berhail mengambil data register");
    });
  });
};

export const postDataRegister = (req, res) => {
  const receivedData = req.body;
  const receivedImg = req.files;

  const imgKtp = receivedImg.img_ktp[0].path;
  const imgKk = receivedImg.img_kk[0].path;
  const imgKtpPerson = receivedImg.img_ktp_person[0].path;

  const result = validationResult(req);
  if (result.isEmpty()) {
    const sqlPostData = `INSERT INTO ?? (kk_number,fullname,phone,email,addres,password,repeat_password,birtdate,rekening,ktp_number,img_ktp,img_kk,img_ktp_person) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(
      sqlPostData,
      [
        "register",
        receivedData.kk_number,
        receivedData.fullname,
        receivedData.phone,
        receivedData.email,
        receivedData.addres,
        receivedData.password,
        receivedData.repeat_password,
        receivedData.birtdate,
        receivedData.rekening,
        receivedData.ktp_number,
        imgKtp,
        imgKk,
        imgKtpPerson,
      ],
      (err, result) => {
        if (err) throw err;
        response(res, result, "Berhasil mengirim data register");
      }
    );
  }
  res.send("Something error", { errors: result.array().msg });
};

export const updateDataUser = (req, res) => {
  const receivedData = req.body;
  const query =
    "UPDATE register SET fullname = ?,phone = ?,email = ?,addres = ?,password = ?,repeat_password = ?,birtdate = ?,rekening = ?,ktp_number = ?,kk_number = ?,img_ktp = ?,img_kk = ?,img_ktp_person = ? where kk_number = ?;";
  db.query(
    query,
    [
      receivedData.fullname,
      receivedData.phone,
      receivedData.email,
      receivedData.addres,
      receivedData.password,
      receivedData.repeat_password,
      receivedData.birtdate,
      receivedData.rekening,
      receivedData.ktp_number,
      receivedData.kk_number,
      receivedData.img_ktp,
      receivedData.img_kk,
      receivedData.img_ktp_person,
      req.query.nik,
    ],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      response(res, result, "Berhasil update data");
    }
  );
};

export const getDataByNikUser = (req, res) => {
  const nik = req.query.nik;
  const sqlGetDataByNik = "SELECT * FROM ?? WHERE ?? = ?;";
  db.query(sqlGetDataByNik, ["register", "kk_number", nik], (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data dengan nik");
  });
};

export const getAllUser = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 7;
  const offset = (page - 1) * limit;
  const sqlGetAllData = "SELECT * FROM register LIMIT ? OFFSET ?;";
  const countRows = "SELECT COUNT(*) AS total FROM ??;";
  db.query(countRows, ["register"], (err, result) => {
    if (err) throw err;

    const totalRows = result[0].total;
    const totalPages = Math.ceil(totalRows / limit);
    db.query(sqlGetAllData, [limit, offset], (err, result) => {
      if (err) throw err;
      responseMainData(
        res,
        result,
        { totalData: totalRows, totalPage: totalPages, page, limit },
        "Berhasil mengambil semua data!"
      );
    });
  });
};

export const getUserByName = (req, res) => {
  const sql = `SELECT * FROM register WHERE fullname LIKE "%${req.query.nama}%";`;
  return db.query(sql, (err, result) => {
    if (err) throw err;
    if (!result) return res.json("Data tidak ditamukan");
    response(res, result, "Berhasil Mengambil Data Dengan Nama");
  });
};

export const deleteDataByNik = (req, res) => {
  const nik = req.query.nik;
  console.log(nik);
  const sql = `DELETE FROM register WHERE kk_number = ${nik};`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};
