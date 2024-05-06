
import multer from "multer";
import shortid from "shortid";
import path from "path";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

const s3 = new aws.S3({
  accessKeyId,
  secretAccessKey,
});

exports.upload = multer({ storage });

export const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "flipkart-clone-app",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});


