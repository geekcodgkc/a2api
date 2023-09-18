import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	createCustomerService,
	getCustomerService,
	getCustomersService,
	deleteCustomerService,
	updateCustomerService,
} from "../services/Customers.Services";

const getCustomer = async (req: Request, res: Response) => {
	try {
		const data = await getCustomerService(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getCustomers = async (req: Request, res: Response) => {
	try {
		const data = await getCustomersService(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createCustomer = async (req: Request, res: Response) => {
	try {
		const customer = await createCustomerService(req);
		res.json(customer);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateCustomer = async (req: Request, res: Response) => {
	try {
		const updated = await updateCustomerService(req);
		res.json(updated);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteCustomer = async (req: Request, res: Response) => {
	try {
		const message = deleteCustomerService(req);
		res.json({ message });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export {
	getCustomer,
	getCustomers,
	deleteCustomer,
	updateCustomer,
	createCustomer,
};
