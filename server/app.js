import express from "express";
import cors from "cors";
import users from "./src/routes/users.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/data", users);

app.listen(PORT, () => {
  console.log(`Server now listening at port ${PORT} `);
});
