import db from "../config/connection.js";
import response from "../utils/response.js";

export const getDataAdmin = (req, res) => {
  const sql = "SELECT ?? FROM ??;";
  const column = ["nik", "password", "username", "role"];

  db.query(sql, [column, "admin"], (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data admin");
  });
};

export const getDataByNikAdmin = (req, res) => {
  const nik = req.query.nik;
  const sqlGetDataByNik = "SELECT * FROM ?? WHERE ?? = ?;";
  db.query(sqlGetDataByNik, ["admin", "nik", nik], (err, result) => {
    if (err) throw err;
    response(res, result, "Berhasil mengambil data dengan nik");
  });
};
