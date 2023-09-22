import { Router } from "express";
import {
	getDepartment,
	getDepartments,
	createDepartment,
	deleteDepartment,
	updateDepartment,
} from "../controllers/Department.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getDepartments);
router.get("/:id", handleAuth, getDepartment);
router.post("/", handleAuth, createDepartment);
router.put("/:id", handleAuth, updateDepartment);
router.delete("/:id", handleAuth, deleteDepartment);

export { router };
