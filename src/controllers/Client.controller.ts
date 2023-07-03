import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getClientService,
	getClientsService,
	updateClientService,
	deleteClientService,
	registerClientService,
} from "../services/Client.Services";

const getClient = async (req: Request, res: Response) => {
	try {
		const data = await getClientService(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getClients = async (req: Request, res: Response) => {
	try {
		const clients = await getClientsService(req);
		res.json({ clients });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const registerClient = async (req: Request, res: Response) => {
	try {
		const client = await registerClientService(req);
		res.json(client);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateClient = async (req: Request, res: Response) => {
	try {
		const client = await updateClientService(req);
		res.json(client);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteClient = async (req: Request, res: Response) => {
	try {
		const client = await deleteClientService(req);
		res.json(client);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getClient, getClients, registerClient, updateClient, deleteClient };
