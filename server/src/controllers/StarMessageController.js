import db from "../config/connection.js";
import response from "../utils/response.js";

export const getStarMessage = (req, res) => {
  const sqlGetStarMessage = "SELECT * FROM ??;";
  const sqlGetRows = "SELECT COUNT(*) as total FROM ??;";

  db.query(sqlGetRows, ["message_star"], (err, result) => {
    if (err) throw err;
    const totalData = result[0].total;

    db.query(sqlGetStarMessage, ["message_star"], (err, result) => {
      if (err) throw err;
      response(res, result, totalData, "Berhasil mengambil data");
    });
  });
};

export const postStarMessage = (req, res) => {
  const date = new Date(req.body.date);

  const sqlGetStarMessage = "SELECT * FROM ?? WHERE ?? = ?;";
  const sqlPostStarMessage = "INSERT INTO ?? (??,??,??) VALUES (?,?,?);";

  db.query(
    sqlGetStarMessage,
    ["message", "created_at", date],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Terjadi kesalahan" });
      db.query(
        sqlPostStarMessage,
        [
          "message_star",
          "fullname",
          "message",
          "created_at",
          result[0].fullname,
          result[0].message,
          result[0].created_at,
        ],
        (err, result) => {
          if (err)
            return res.status(500).json({ error: "Gagal mengirim data" });
          response(res, result, "Berhasil mengirim data");
        }
      );
    }
  );
};
