import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getConfigService,
	createConfigService,
	updateConfigService,
} from "../services/Config.Services";

const getConfig = async (req: Request, res: Response) => {
	try {
		const data = await getConfigService();
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createConfig = async (req: Request, res: Response) => {
	try {
		const data = await createConfigService(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateConfig = async (req: Request, res: Response) => {
	try {
		const data = await updateConfigService(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getConfig, createConfig, updateConfig };
