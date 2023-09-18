import { Request } from "express";
import CustomerModel from "../models/Customer.Model";
import { Customer } from "../interfaces/Customers.interface";

const createCustomer = async (req: Request) => {
	const body = req.body;

	try {
		const customer = await CustomerModel.create(body);
		return customer;
	} catch (error) {
		return error;
	}
};

const getCustomer = async (req: Request) => {
	const id = req.params.id;
	const populated = req.query.populated;

	try {
		const customer = populated
			? await CustomerModel.findById(id).populate("ClientId")
			: CustomerModel.findById(id);
		return customer;
	} catch (error) {
		return error;
	}
};

const getCustomers = async (req: Request) => {
	const limit = req.query.limit?.toString();
	const offset = req.query.offset?.toString();

	const query = {
		limit: (limit && parseInt(limit)) || 20,
		offset: (offset && parseInt(offset)) || 0,
	};

	try {
		const customers = await CustomerModel.find({}, {}, query);
		return customers;
	} catch (error) {
		return error;
	}
};

const deleteCustomer = async (req: Request) => {
	const id = req.params.id;

	try {
		await CustomerModel.findByIdAndDelete(id);
		return `customer with id: "${id}" deleted successfully`;
	} catch (error) {
		return error;
	}
};

const updateCustomer = async (req: Request) => {
	const id = req.params.id;
	const data = req.body;

	try {
		const client = await CustomerModel.findByIdAndUpdate(id, data).populate(
			"ClientId",
		);
		return client;
	} catch (error) {
		return error;
	}
};

export {
	createCustomer,
	updateCustomer,
	getCustomers,
	getCustomer,
	deleteCustomer,
};
