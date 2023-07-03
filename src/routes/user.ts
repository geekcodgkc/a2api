import { Router } from "express";
import { login, logout } from "../controllers/Login.controller";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

export { router };
