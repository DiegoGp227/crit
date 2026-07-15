import { Router } from "express";
import dbCheck from "../modules/test/test.js";
import { login, signup } from "../modules/auth/auth.controllers.js";
export const router: Router = Router();

// RM: Test Routes — remove/replace in production
router.get("/db", dbCheck);

// RM: Auth Routes — replace with your own routes
router.post("/signup", signup);
router.post("/login", login);
