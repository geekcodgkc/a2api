import { Router } from "express";
import {
	getZone,
	getZones,
	createZone,
	updateZone,
	deleteZone,
} from "../controllers/Zone.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getZones);
router.get("/:id", handleAuth, getZone);
router.post("/", handleAuth, createZone);
router.put("/:id", handleAuth, updateZone);
router.delete("/:id", handleAuth, deleteZone);

export { router };
