import { Router } from "express";
import {
	getOrder,
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
	getOrdersByClient,
} from "../controllers/Order.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getOrders);
router.get("/client/:id", handleAuth, getOrdersByClient);
router.get("/:id", handleAuth, getOrder);
router.post("/", handleAuth, createOrder);
router.put("/:id", handleAuth, updateOrder);
router.delete("/:id", handleAuth, deleteOrder);

export { router };
