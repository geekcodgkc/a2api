import { Request } from "express";
import freightModel from "../models/Freight.Model";

const getFreightService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.params.populated;

	if (id) {
		try {
			const freight = populated
				? await freightModel.findById(id).populate("cod")
				: await freightModel.findById(id);
			return freight;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getFreightsService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.params.populated;

	if (id) {
		try {
			const freight = populated
				? await freightModel.find().populate("cod")
				: await freightModel.find();
			return freight;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const createFreightService = async (req: Request) => {
	const data = req.body;
	try {
		const freight = await freightModel.create(data);
		return freight;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const updateFreightService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const freight = await freightModel
				.findByIdAndUpdate(id, data, {
					new: true,
				})
				.populate("cod");
			return freight;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id" was required');
};

const deleteFreightService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await freightModel.findByIdAndDelete(id);
			return `freight with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id"was required');
};

export {
	getFreightService,
	getFreightsService,
	createFreightService,
	updateFreightService,
	deleteFreightService,
};
