import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "smkw9sibantengs",
  password: "sibantengs123",
  database: "smkw9_sibantengs",
});

export default db;
