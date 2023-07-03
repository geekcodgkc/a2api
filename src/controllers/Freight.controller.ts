import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getFreightService,
	getFreightsService,
	createFreightService,
	updateFreightService,
	deleteFreightService,
} from "../services/Freight.Services";

const getFreight = async (req: Request, res: Response) => {
	try {
		const response = await getFreightService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getFreights = async (req: Request, res: Response) => {
	try {
		const response = await getFreightsService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createFreight = async (req: Request, res: Response) => {
	try {
		const response = await createFreightService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateFreight = async (req: Request, res: Response) => {
	try {
		const response = await updateFreightService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteFreight = async (req: Request, res: Response) => {
	try {
		const response = await deleteFreightService(req);
		res.json({ message: response });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getFreight, getFreights, createFreight, updateFreight, deleteFreight };
