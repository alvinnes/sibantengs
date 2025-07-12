import multer from "multer";

const typeImg = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidImg = typeImg[file.mimetype];
    let errorMessage = new Error("Format gambar harus jpg/jpeg/png!");

    if (isValidImg) {
      errorMessage = null;
    }

    cb(errorMessage, "./public/images");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(" ").join("-");
    const ext = typeImg[file.mimetype];

    const uniqueName = `${filename.toUpperCase()}-${Date.now()}.${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
