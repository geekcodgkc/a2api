import { Router } from "express";
import {
	getSeller,
	getSellers,
	createSeller,
	deleteSeller,
	updateSeller,
} from "../controllers/Seller.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getSellers);
router.get("/:id", handleAuth, getSeller);
router.post("/", handleAuth, createSeller);
router.put("/:id", handleAuth, updateSeller);
router.delete("/:id", handleAuth, deleteSeller);

export { router };
