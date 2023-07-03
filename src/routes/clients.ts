import { Router } from "express";
import {
	getClient,
	getClients,
	registerClient,
	updateClient,
	deleteClient,
} from "../controllers/Client.controller";

const router = Router();

router.get("/", getClients);
router.get("/:id", getClient);
router.post("/register", registerClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export { router };
