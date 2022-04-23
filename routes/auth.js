import express from "express";

import * as auth from "../controllers/auth.js";
import { isAuth, authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", auth.postRegister, authenticate);
router.post("/login", authenticate, auth.postLogin);
router.get("/logout", auth.getLogout);
router.get("/user", isAuth, auth.getUser);

export default router;
