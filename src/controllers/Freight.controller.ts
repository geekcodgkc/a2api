import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";

const getFreight = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getFreights = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createFreight = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateFreight = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteFreight = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getFreight, getFreights, createFreight, updateFreight, deleteFreight };
