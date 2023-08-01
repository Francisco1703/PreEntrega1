import multer from "multer";
const __dirname = "C:/Users/portatil/Desktop/Backend/pre-entrega1";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/products");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
export default __dirname;
