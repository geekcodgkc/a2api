import { Request } from "express";
import CustomerModel from "../models/Customer.Model";
import { extractDataFromJwtCookie } from "../utils/jwtutils";

const createCustomerService = async (req: Request) => {
	const body = req.body;

	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		body.clienID = CookieData.clientID;
		const customer = await CustomerModel.create(body);
		return customer;
	} catch (error) {
		return error;
	}
};

const getCustomerService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.query.populated;

	try {
		const customer = populated
			? await CustomerModel.findById(id).populate("clientID")
			: CustomerModel.findById(id);
		return customer;
	} catch (error) {
		return error;
	}
};

const getCustomersService = async (req: Request) => {
	const limit = req.query.limit?.toString();
	const offset = req.query.offset?.toString();

	const query = {
		limit: (limit && parseInt(limit)) || 20,
		offset: (offset && parseInt(offset)) || 0,
	};

	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		const customers = await CustomerModel.find(
			{ seller: CookieData._id },
			{},
			query,
		);
		return customers;
	} catch (error) {
		return error;
	}
};

const deleteCustomerService = async (req: Request) => {
	const id = req.params.id;

	try {
		await CustomerModel.findByIdAndDelete(id);
		return `customer with id: "${id}" deleted successfully`;
	} catch (error) {
		return error;
	}
};

const updateCustomerService = async (req: Request) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const client = await CustomerModel.findByIdAndUpdate(id, data).populate(
			"clientID",
		);
		return client;
	} catch (error) {
		return error;
	}
};

export {
	createCustomerService,
	updateCustomerService,
	getCustomersService,
	getCustomerService,
	deleteCustomerService,
};
