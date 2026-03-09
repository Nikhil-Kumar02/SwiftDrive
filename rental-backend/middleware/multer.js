// import multer from "multer";

// const upload = multer({storage: multer.diskStorage()});

// export default upload;

import multer from "multer";
import path from "path";

// Storage config
const storage = multer.memoryStorage();

// File filter (optional but recommended)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
