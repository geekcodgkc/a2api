import ProductsListModel from "../models/ProductsLists.Model";
import { Request } from "express";

const getAllList = async () => {
	try {
		const products = await ProductsListModel.find().populate("products");
		return products;
	} catch (error) {
		throw Error(`${error}`);
	}
};

const createList = async (req: Request) => {
	const { body } = req;

	try {
		const products = await ProductsListModel.create(body);
		return products;
	} catch (error) {
		throw Error(`${error}`);
	}
};

const updateList = async (req: Request) => {
	const { body } = req;
	const { id } = req.params;

	try {
		const products = await ProductsListModel.findByIdAndUpdate(id, {
			$set: body,
		});
		return products;
	} catch (error) {
		throw Error(`${error}`);
	}
};

const deleteList = async (req: Request) => {
	const { id } = req.params;

	try {
		await ProductsListModel.findByIdAndDelete(id);
		return `list with ${id} removed`;
	} catch (error) {
		throw Error(`${error}`);
	}
};

export { getAllList, createList, updateList, deleteList };
