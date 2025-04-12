import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "..", "uploads"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });
