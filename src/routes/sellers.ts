import { Router } from "express";
import {
	getSeller,
	getSellers,
	createSeller,
	deleteSeller,
	updateSeller,
} from "../controllers/Seller.controller";

const router = Router();

router.get("/", getSellers);
router.get("/:id", getSeller);
router.post("/", createSeller);
router.put("/:id", updateSeller);
router.delete("/:id", deleteSeller);

export { router };
