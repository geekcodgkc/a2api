import { Router } from "express";
import {
	getFreight,
	getFreights,
	createFreight,
	updateFreight,
	deleteFreight,
} from "../controllers/Freight.controller";

const router = Router();

router.get("/", getFreights);
router.get("/:id", getFreight);
router.post("/", createFreight);
router.put("/:id", updateFreight);
router.delete("/:id", deleteFreight);

export { router };
