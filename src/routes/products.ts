import { Router } from "express";
import {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/Product.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getProducts);
router.get("/:id", handleAuth, getProduct);
router.post("/", handleAuth, createProduct);
router.put("/:id", handleAuth, updateProduct);
router.delete("/:id", handleAuth, deleteProduct);

export { router };
