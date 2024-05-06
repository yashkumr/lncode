import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import shortid from "shortid";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  upload.single("categoryImage"),
  createCategoryController
);

//update category
router.put(
  "/update-category/",
  requireSignIn,
  isAdmin,
  upload.array("categoryImage"),
  updateCategoryController
);
//get all category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete("/delete-category", deleteCategoryCOntroller);

export default router;
