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
  getRiders,
  updateProfile,
} from "../modules/profile/profile.controllers.js";
import { upload } from "../modules/upload/upload.controllers.js";
import {
  getRegistrations,
  registerForChampionship,
} from "../modules/registration/registration.controllers.js";
import {
  createRaceController,
  deleteRaceController,
  downloadRaceExcelController,
  getRaceController,
  listRacesController,
  updateRaceController,
} from "../modules/races/races.controllers.js";
import {
  getRaceResultsController,
  setRaceResultsController,
  uploadRaceExcelController,
} from "../modules/results/results.controllers.js";
import { getClassificationController } from "../modules/classification/classification.controllers.js";
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
router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("image"),
  upload,
);

// Profile Routes
router.get("/me", authMiddleware, getProfile);
router.patch("/me/profile", authMiddleware, updateProfile);
router.get("/riders", getRiders);
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

// Public Race Routes
router.get("/races", listRacesController);
router.get("/races/:id", getRaceController);
router.get("/races/:id/results", getRaceResultsController);
router.get("/classification", getClassificationController);

// Admin Race Routes
router.get(
  "/admin/races",
  authMiddleware,
  adminMiddleware,
  listRacesController,
);
router.post(
  "/admin/races",
  authMiddleware,
  adminMiddleware,
  createRaceController,
);
router.get(
  "/admin/races/:id",
  authMiddleware,
  adminMiddleware,
  getRaceController,
);
router.patch(
  "/admin/races/:id",
  authMiddleware,
  adminMiddleware,
  updateRaceController,
);
router.delete(
  "/admin/races/:id",
  authMiddleware,
  adminMiddleware,
  deleteRaceController,
);
router.get(
  "/admin/races/:id/excel",
  authMiddleware,
  adminMiddleware,
  downloadRaceExcelController,
);
router.post(
  "/admin/races/:id/excel",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("file"),
  uploadRaceExcelController,
);
router.get(
  "/admin/races/:id/results",
  authMiddleware,
  adminMiddleware,
  getRaceResultsController,
);
router.put(
  "/admin/races/:id/results",
  authMiddleware,
  adminMiddleware,
  setRaceResultsController,
);
