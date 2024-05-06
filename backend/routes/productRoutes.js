import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productColorController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  productSizeController,
  realtedProductController,
  searchProductController,
  updateProductController,
  visibleProductController,
} from "../controllers/productController.js";
import multer from "multer";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";

//ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

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
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.fields([{ name: "mainImage",maxCount: 1 }, { name: "productPicture" }]),
  createProductController
);

// get product
router.get("/get-product", getProductController);

// visible product
router.get("/visible-product/:buttonid", visibleProductController);
//single product
router.get("/get-product/:slug", getSingleProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete Products
router.delete("/delete-product/:id", deleteProductController);

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  upload.array("productPicture"),
  updateProductController
);
//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//filter product
router.post("/product-filters", productFiltersController);

//category wise Product
router.get("/product-category/:slug", productCategoryController);
//color wise Product
router.get("/product-color/:slug", productColorController);
//size wise Product
router.get("/product-size/:slug", productSizeController);
//search Product
router.get("/search/:keyword", searchProductController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);
//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router;
