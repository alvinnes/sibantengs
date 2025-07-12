import express from "express";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import adminRoute from "./routes/adminRoute.js";
import messageRoute from "./routes/messageRoute.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api/v1", usersRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", messageRoute);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("Error multer");
    return res.status(400).json({ errors: err });
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server now listening at port ${PORT} `);
});
