import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";

const getClient = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getClients = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const registerClient = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateClient = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteClient = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getClient, getClients, registerClient, updateClient, deleteClient };
