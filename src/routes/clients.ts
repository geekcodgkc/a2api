import { Router } from "express";
import {
	getClient,
	getClients,
	registerClient,
	updateClient,
	deleteClient,
	createClients,
} from "../controllers/Client.controller";

const router = Router();

router.get("/", getClients);
router.get("/:id", getClient);
router.post("/register", registerClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
router.post("/", createClients);

export { router };
