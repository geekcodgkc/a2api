import { Router } from "express";
import {
	getCustomer,
	getCustomers,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from "../controllers/Customer.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getCustomers);
router.get("/:id", handleAuth, getCustomer);
router.post("/", handleAuth, createCustomer);
router.put("/:id", handleAuth, updateCustomer);
router.delete("/:id", handleAuth, deleteCustomer);

export { router };
