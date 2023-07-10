import { Router } from "express";
import { login, logout } from "../controllers/Login.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/logout", handleAuth, logout);

export { router };
