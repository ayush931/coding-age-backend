
import multer from "multer";
import CodingAgeError from "../utils/err.util.js";

// Allowed file extensions
const allowedExtensions = ["jpg", "jpeg", "png"];

// Allowed MIME types
const allowedMimeTypes = ["image/jpeg", "image/png"];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const extension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  if (
    allowedExtensions.includes(extension) &&
    allowedMimeTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(400, "Only .jpg, .jpeg, and .png files are allowed!"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export default upload;
