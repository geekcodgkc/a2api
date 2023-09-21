import { Request } from "express";
import ClientModel from "../models/Client.Model";
import { hashpassword } from "../utils/bcryptUtils";
import sendDataToSocket from "../utils/sendDataToSocket";
import { ClientForm } from "../interfaces/Client.interface";

interface clientsRequest<T> extends Request {
	body: T;
}

const dataToArray = async (data: ClientForm[]) => {
	const clientsData: object[] | [] = [data];
	clientsData.pop();

	for (let i = 0; i < data.length; i++) {
		const { password, rif, name, address, email, zone, phone, contact } =
			data[i];
		const passwordhash: string = await hashpassword(password);
		clientsData.push({
			rif,
			name,
			address,
			email,
			zone,
			phone,
			contact,
			password: passwordhash,
		});
	}

	return clientsData;
};

const createClientsService = async (req: clientsRequest<ClientForm>) => {
	const data = req.body;
	const rbody = typeof data === "object" ? [data] : data;
	const clientsData = await dataToArray(rbody);

	try {
		const clients = await ClientModel.insertMany(clientsData);
		return clients;
	} catch (error: unknown) {
		throw `${error}`;
	}
};

const getClientService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.query.populated;

	if (id) {
		try {
			const client = populated
				? await ClientModel.findOne(
						{ rif: id },
						"-password -__v -createdAt -updatedAt -_id",
				  ).populate("seller", "-password -id -createdAt -updatedAt -__v")
				: await ClientModel.findOne(
						{ rif: id },
						"-password -__v -createdAt -updatedAt -_id",
				  );
			return client;
		} catch (error: unknown) {
			throw `${error}`;
		}
	}

	throw "no 'id' was provided";
};

const getClientsService = async (req: Request) => {
	const populated = req.query.populated;

	try {
		const clients = populated
			? await ClientModel.find({}, { password: 0 }).populate(
					"sellers",
					"-password -id -createdAt -updatedAt -__v",
			  )
			: await ClientModel.find(
					{},
					{ password: 0, __V: 0, createdAt: 0, updatedAt: 0, __v: 0 },
			  );
		return clients;
	} catch (error) {
		throw `${error}`;
	}
};

const registerClientService = async (req: Request) => {
	const data = req.body;
	try {
		const password = await hashpassword(data.password);
		const clientData = { ...data, password };
		const client = await ClientModel.create(clientData);
		await client.populate("sellers");
		const message = { data: client.toJSON(), type: "client" };
		sendDataToSocket("data", "POST", message);
		return client;
	} catch (error) {
		throw `${error}`;
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
			}).populate(["sellers"]);
			const message = {
				data: client ? client.toJSON() : client,
				type: "client",
			};
			if (client) {
				sendDataToSocket(`data/${client.id}`, "PUT", message);
			}
			return client;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw '"id" was required';
};

const deleteClientService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await ClientModel.findOneAndDelete({ rif: id });
			return `client with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw '"id"was required';
};

export {
	getClientService,
	getClientsService,
	registerClientService,
	updateClientService,
	deleteClientService,
	createClientsService,
};
