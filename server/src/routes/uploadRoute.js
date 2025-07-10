import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now();
    cb(null, file.fieldname + "-" + uniqueName);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/img", (req, res) => {
  res.send("tes");
});

router.post(
  "/img",
  upload.fields([
    { name: "img-ktp", maxCount: 1 },
    { name: "img-kk", maxCount: 1 },
    { name: "img-ktp-person", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.body);
    console.log(req.files);
  }
);

export default router;
