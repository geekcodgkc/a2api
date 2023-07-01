import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";

const getZone = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getZones = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createZone = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateZone = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteZone = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getZone, getZones, createZone, updateZone, deleteZone };
