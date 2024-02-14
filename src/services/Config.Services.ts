import { Request } from "express";
import ConfigModel from "../models/Config.Model";

const getConfigService = async () => {
	try {
		const data = await ConfigModel.findOne();
		return data;
	} catch (error) {
		return error;
	}
};

const createConfigService = async (req: Request) => {
	try {
		const body = req.body;
		const exist = await ConfigModel.findOne();

		if (exist) {
			const data = await ConfigModel.findByIdAndUpdate(
				exist._id.toString(),
				body,
			);
			return data;
		} else {
			const data = await ConfigModel.create(body);
			return data;
		}
	} catch (error) {
		return error;
	}
};

const updateConfigService = async (req: Request) => {
	try {
		const id = req.params.id;
		const body = req.body;
		console.log(req.body);
		const data = await ConfigModel.findByIdAndUpdate(id, { $set: body });
		return data;
	} catch (error) {
		return error;
	}
};

export { getConfigService, createConfigService, updateConfigService };
