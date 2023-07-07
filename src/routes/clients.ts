import { Router } from "express";
import {
	getClient,
	getClients,
	registerClient,
	updateClient,
	deleteClient,
	createClients,
} from "../controllers/Client.controller";
import handleAuth from "../middleware/authMiddleware";

const router = Router();

router.get("/", handleAuth, getClients);
router.get("/:id", handleAuth, getClient);
router.post("/register", handleAuth, registerClient);
router.put("/:id", handleAuth, updateClient);
router.delete("/:id", handleAuth, deleteClient);
router.post("/", handleAuth, createClients);

export { router };
