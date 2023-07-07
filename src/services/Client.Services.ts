import { Request } from "express";
import ClientModel from "../models/Client.Model";
import { hashpassword } from "../utils/bcryptUtils";
import { Client } from "../interfaces/Client.interface";
import sendDataToSocket from "../utils/sendDataToSocket";

const createClientsService = async (req: Request) => {
	const data = req.body;

	try {
		const clients = await ClientModel.insertMany(data);
		return clients;
	} catch (error: unknown) {
		throw new Error(`${error}`);
	}
};

const getClientService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.query.populated;

	if (id) {
		try {
			const client = populated
				? await ClientModel.findOne<Client | null>(
						{ rif: id },
						"-password -__v -createdAt -updatedAt -_id",
				  )
						.populate("zone", "-_id -createdAt -updatedAt -id -__v")
						.populate("seller", "-password -id -createdAt -updatedAt -__v")
				: await ClientModel.findOne<Client | null>(
						{ rif: id },
						"-password -__v -createdAt -updatedAt -_id",
				  );
			return client;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getClientsService = async (req: Request) => {
	const populated = req.query.populated;

	try {
		const clients = populated
			? await ClientModel.find({}, { password: 0 })
					.populate("zone", "-_id -createdAt -updatedAt -id -__v")
					.populate("seller", "-password -id -createdAt -updatedAt -__v")
			: await ClientModel.find(
					{},
					{ password: 0, __V: 0, createdAt: 0, updatedAt: 0, __v: 0 },
			  );
		return clients;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const registerClientService = async (req: Request) => {
	const data = req.body;
	try {
		const password = await hashpassword(data.password);
		data.password = password;
		const client = await ClientModel.create(data);
		const message = { data: client.toJSON(), type: "client" };
		sendDataToSocket("data", "POST", message);
		return client;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const updateClientService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;
	if (data.password) {
		const password = await hashpassword(data.password);
		data.password = password;
	}

	if (id) {
		try {
			const client = await ClientModel.findOneAndUpdate({ rif: id }, data, {
				new: true,
			}).populate(["zone", "seller"]);
			const message = {
				data: client ? client.toJSON() : client,
				type: "client",
			};
			if (client) {
				sendDataToSocket(`data/${client.id}`, "PUT", message);
			}
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
			await ClientModel.findOneAndDelete({ rif: id });
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
	createClientsService,
};
