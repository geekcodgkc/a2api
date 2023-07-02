import { Router } from "express";
import {
	getZone,
	getZones,
	createZone,
	updateZone,
	deleteZone,
} from "../controllers/Zone.controller";

const router = Router();

router.get("/", getZones);
router.get("/:id", getZone);
router.post("/", createZone);
router.put("/:id", updateZone);
router.delete("/:id", deleteZone);

export { router };
