import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";

const getOrder = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getOrders = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createOrder = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateOrder = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteOrder = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getOrder, getOrders, createOrder, updateOrder, deleteOrder };
