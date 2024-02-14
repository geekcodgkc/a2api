import { Router } from "express";
import {
	getConfig,
	createConfig,
	updateConfig,
} from "../controllers/Config.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getConfig);
router.post("/", handleAuth, createConfig);
router.put("/:id", handleAuth, updateConfig);

export { router };
