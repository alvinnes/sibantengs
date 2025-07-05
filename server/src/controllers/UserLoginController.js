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
      response(res, result, "Berhasil Mengirim Data!");
    });
  } else {
    return res.json({ errors: result.array() });
  }
};
