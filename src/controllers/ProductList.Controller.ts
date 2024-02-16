import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import {
	getAllList,
	createList,
	updateList,
	deleteList,
} from "../services/ProductsList.Services";

const getListsController = async (res: Response) => {
	try {
		const data = await getAllList();
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const createListController = async (req: Request, res: Response) => {
	try {
		const data = await createList(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const updateListController = async (req: Request, res: Response) => {
	try {
		const data = await updateList(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const deleteListController = async (req: Request, res: Response) => {
	try {
		const data = await deleteList(req);
		res.json(data);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export {
	getListsController,
	createListController,
	updateListController,
	deleteListController,
};
