import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getOrderService,
	getOrdersService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
	getOrdersByClientService,
} from "../services/Order.Services";

const getOrder = async (req: Request, res: Response) => {
	try {
		const response = await getOrderService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getOrders = async (req: Request, res: Response) => {
	try {
		const response = await getOrdersService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getOrdersByClient = async (req: Request, res: Response) => {
	try {
		const response = await getOrdersByClientService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		const response = await createOrderService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateOrder = async (req: Request, res: Response) => {
	try {
		const response = await updateOrderService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		const response = await deleteOrderService(req);
		res.json({ message: response });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export {
	getOrder,
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
	getOrdersByClient,
};
