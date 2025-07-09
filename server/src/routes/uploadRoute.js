import express from "express";
import { getImage, postImage } from "../controllers/Upload.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueName);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/img", getImage);
router.post("/img", upload.single("foto"), postImage);

export default router;
