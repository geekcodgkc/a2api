import { Request } from "express";
import zoneModel from "../models/Zone.Model";
import { noId } from "../config/ErrorTypes";

const getZoneService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			const zone = await zoneModel.findById(id);
			return zone;
		} catch (error: unknown) {
			throw `${error}`;
		}
	}

	throw noId;
};

const getZonesService = async (req: Request) => {
	try {
		const zones = zoneModel.find();
		return zones;
	} catch (error) {
		throw `${error}`;
	}
};

const createZoneService = async (req: Request) => {
	const data = req.body;
	try {
		const zone = await zoneModel.create(data);
		return zone;
	} catch (error) {
		throw `${error}`;
	}
};

const updateZoneService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const zone = await zoneModel.findByIdAndUpdate(id, data, {
				new: true,
			});
			return zone;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw noId;
};

const deleteZoneService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await zoneModel.findByIdAndDelete(id);
			return `zone with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw noId;
};

export {
	getZoneService,
	getZonesService,
	createZoneService,
	updateZoneService,
	deleteZoneService,
};
