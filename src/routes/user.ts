import { Router } from "express";
import { login, logout, socketLogin } from "../controllers/Login.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/logout", handleAuth, logout);
router.post("/socket-login", socketLogin);

export { router };
