import db from "../config/connection.js";
import response from "../utils/response.js";

export const getDataAdmin = (req, res) => {
  const sql = "SELECT ?? FROM ??;";
  const column = ["nik", "password", "username", "role", "email"];

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

export const updateAdmin = (req, res) => {
  const editedData = req.body;
  console.log(editedData);
  const sqlUpdateData =
    "UPDATE ?? SET username = ?,nik = ?,password = ?,email = ? where ?? = ?;";
  db.query(
    sqlUpdateData,
    [
      "admin",
      editedData.username,
      editedData.nik,
      editedData.password,
      editedData.email,
      "nik",
      req.query.nik,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Terjadi kesalahan" });
      response(res, result, "Berhasil update data admin");
    }
  );
};
