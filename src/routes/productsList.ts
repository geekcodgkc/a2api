import { Router } from "express";
import {
	createListController,
	getListsController,
	updateListController,
	deleteListController,
} from "../controllers/ProductList.Controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getListsController);
router.post("/", handleAuth, createListController);
router.put("/:id", handleAuth, updateListController);
router.delete("/:id", handleAuth, deleteListController);

export { router };
