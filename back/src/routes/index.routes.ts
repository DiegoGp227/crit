import { Router } from "express";
import multer from "multer";
import dbCheck from "../modules/test/test.js";
import { login, signup } from "../modules/auth/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getBibs,
  getProfile,
  getRiderProfile,
  updateProfile,
} from "../modules/profile/profile.controllers.js";
import { upload } from "../modules/upload/upload.controllers.js";
import { registerForChampionship } from "../modules/registration/registration.controllers.js";
export const router: Router = Router();

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// RM: Test Routes — remove/replace in production
router.get("/db", dbCheck);

// RM: Auth Routes — replace with your own routes
router.post("/signup", signup);
router.post("/login", login);

// Upload Routes
router.post("/upload", authMiddleware, uploadMiddleware.single("image"), upload);

// Profile Routes
router.get("/me", authMiddleware, getProfile);
router.patch("/me/profile", authMiddleware, updateProfile);
router.get("/riders/:id", getRiderProfile);
router.get("/bibs", getBibs);

// Registration Routes
router.post("/me/registration", authMiddleware, registerForChampionship);
