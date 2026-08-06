import { Router } from "express";
import multer from "multer";
import dbCheck from "../modules/test/test.js";
import { login, logout, signup } from "../modules/auth/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  getBibs,
  getProfile,
  getRiderProfile,
  updateProfile,
} from "../modules/profile/profile.controllers.js";
import { upload } from "../modules/upload/upload.controllers.js";
import {
  getRegistrations,
  registerForChampionship,
} from "../modules/registration/registration.controllers.js";
export const router: Router = Router();

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/db", dbCheck);

router.post("/signup", signup);
router.post("/login", login);
// Cierra la sesión borrando la cookie HttpOnly server-side.
router.post("/logout", logout);

// Upload Routes
router.post("/upload", authMiddleware, uploadMiddleware.single("image"), upload);

// Profile Routes
router.get("/me", authMiddleware, getProfile);
router.patch("/me/profile", authMiddleware, updateProfile);
router.get("/riders/:id", getRiderProfile);
router.get("/bibs", getBibs);

// Registration Routes
router.post("/me/registration", authMiddleware, registerForChampionship);

// Admin Routes
router.get(
  "/admin/registrations",
  authMiddleware,
  adminMiddleware,
  getRegistrations,
);
