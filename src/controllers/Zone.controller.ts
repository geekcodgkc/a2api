import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getZoneService,
	getZonesService,
	createZoneService,
	updateZoneService,
	deleteZoneService,
} from "../services/Zone.Services";

const getZone = async (req: Request, res: Response) => {
	try {
		const response = await getZoneService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getZones = async (req: Request, res: Response) => {
	try {
		const response = await getZonesService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createZone = async (req: Request, res: Response) => {
	try {
		const response = await createZoneService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateZone = async (req: Request, res: Response) => {
	try {
		const response = await updateZoneService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteZone = async (req: Request, res: Response) => {
	try {
		const response = await deleteZoneService(req);
		res.json({ message: response });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getZone, getZones, createZone, updateZone, deleteZone };
