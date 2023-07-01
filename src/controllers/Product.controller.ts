import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";

const getProduct = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getProducts = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createProduct = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		console.log("called");
		res.json({ message: "route called" });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
