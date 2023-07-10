import { Router } from "express";
import {
	getFreight,
	getFreights,
	createFreight,
	updateFreight,
	deleteFreight,
} from "../controllers/Freight.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getFreights);
router.get("/:id", handleAuth, getFreight);
router.post("/", handleAuth, createFreight);
router.put("/:id", handleAuth, updateFreight);
router.delete("/:id", handleAuth, deleteFreight);

export { router };
