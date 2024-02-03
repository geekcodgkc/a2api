import { Request } from "express";
import ConfigModel from "../models/Config.Model";

const getConfigService = async () => {
	try {
		const data = "this is the config";
		return data;
	} catch (error) {
		return error;
	}
};

const createConfigService = async (req: Request) => {
	try {
		const data = "this is the config";
		return data;
	} catch (error) {
		return error;
	}
};

const updateConfigService = async (req: Request) => {
	try {
		const data = "this is the config";
		return data;
	} catch (error) {
		return error;
	}
};

export { getConfigService, createConfigService, updateConfigService };
