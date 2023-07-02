import { Request } from "express";
import ClientModel from "../models/Client.Model";

const getClientService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.params.populated;

	if (id) {
		try {
			const client = populated
				? await ClientModel.findById(id).populate(["zone", "seller"])
				: await ClientModel.findById(id);
			return client;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getClientsService = async (req: Request) => {
	const populated = req.params.populated;

	try {
		const clients = populated
			? await ClientModel.find().populate(["zone", "seller"])
			: await ClientModel.find();
		return clients;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const registerClientService = async (req: Request) => {
	const data = req.body;
	try {
		const client = await ClientModel.create(data);
		return client;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const updateClientService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const client = await ClientModel.findByIdAndUpdate(id, data, {
				new: true,
			}).populate(["zone", "seller"]);
			return client;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id" was required');
};

const deleteClientService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await ClientModel.findByIdAndDelete(id);
			return `client with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id"was required');
};

export {
	getClientService,
	getClientsService,
	registerClientService,
	updateClientService,
	deleteClientService,
};
