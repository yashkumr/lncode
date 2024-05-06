import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
import {
  createBannerController,
  deleteBannerController,
  getBannerController,
  getSingleBannerController,
  productPhotoController,
  updateBannerController,
} from "../controllers/bannerController.js";
const router = express.Router();
//routes
router.post(
  "/create-banner",
  requireSignIn,
  isAdmin,
  formidable(),
  createBannerController
);

//get photo
router.get("/product-photo/:pid", productPhotoController);

router.get("/get-banner", getBannerController);

//single product
router.get("/get-banner/:slug", getSingleBannerController);

router.put("/update-banner/:pid",requireSignIn, isAdmin,formidable(), updateBannerController)
//delete rproduct
router.delete("/delete-banner/:pid", deleteBannerController);

export default router;
