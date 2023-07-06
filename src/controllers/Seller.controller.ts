import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getSellerService,
	getSellersService,
	createSellerService,
	updateSellerService,
	deleteSellerService,
} from "../services/Seller.Services";

const getSeller = async (req: Request, res: Response) => {
	try {
		const seller = await getSellerService(req);
		res.json(seller);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const getSellers = async (req: Request, res: Response) => {
	try {
		const seller = await getSellersService();
		res.json(seller);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createSeller = async (req: Request, res: Response) => {
	try {
		const seller = await createSellerService(req);
		res.json(seller);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateSeller = async (req: Request, res: Response) => {
	try {
		const seller = await updateSellerService(req);
		res.json(seller);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteSeller = async (req: Request, res: Response) => {
	try {
		const seller = await deleteSellerService(req);
		res.json({ message: seller });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { getSeller, getSellers, createSeller, updateSeller, deleteSeller };
