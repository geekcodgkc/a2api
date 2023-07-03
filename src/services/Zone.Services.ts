import { Request } from "express";
import zoneModel from "../models/Zone.Model";

const getZoneService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			const zone = await zoneModel.findById(id);
			return zone;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getZonesService = async (req: Request) => {
	try {
		const zones = zoneModel.find();
		return zones;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const createZoneService = async (req: Request) => {
	const data = req.body;
	try {
		const zone = await zoneModel.create(data);
		return zone;
	} catch (error) {
		throw new Error(`${error}`);
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
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id" was required');
};

const deleteZoneService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await zoneModel.findByIdAndDelete(id);
			return `zone with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id"was required');
};

export {
	getZoneService,
	getZonesService,
	createZoneService,
	updateZoneService,
	deleteZoneService,
};
