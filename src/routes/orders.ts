import { Router } from "express";
import {
	getOrder,
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
} from "../controllers/Order.controller";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export { router };
