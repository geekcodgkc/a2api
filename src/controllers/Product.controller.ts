import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getProductService,
	getProductsService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "../services/Product.Services";

const getProduct = async (req: Request, res: Response) => {
	try {
		const response = await getProductService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getProducts = async (req: Request, res: Response) => {
	try {
		const response = await getProductsService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createProduct = async (req: Request, res: Response) => {
	try {
		const response = await createProductService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateProduct = async (req: Request, res: Response) => {
	try {
		const response = await updateProductService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteProduct = async (req: Request, res: Response) => {
	try {
		const response = await deleteProductService(req);
		res.json({ message: response });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
