import express from "express";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import adminRoute from "./routes/adminRoute.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/data", usersRoute);
app.use("/data", adminRoute);

app.listen(PORT, () => {
  console.log(`Server now listening at port ${PORT} `);
});
