import express from "express";
import { forgotPasswordController, loginController, registerController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//registerRoute
router.post("/register", registerController);

//loginRoute
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//update profile
router.put("/profile", requireSignIn, updateProfileController);


//Protected UserRoute
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
