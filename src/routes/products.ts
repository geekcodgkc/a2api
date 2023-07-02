import { Router } from "express";
import {
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/Product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router };
