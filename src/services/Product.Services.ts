import { Request } from "express";
import productModel from "../models/Products.Model";

const getProductService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			const product = await productModel.findById(id);
			return product;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getProductsService = async (req: Request) => {
	try {
		const product = productModel.find();
		return product;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const createProductService = async (req: Request) => {
	const data = req.body;
	try {
		const product = await productModel.create(data);
		return product;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const updateProductService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const product = await productModel.findByIdAndUpdate(id, data, {
				new: true,
			});
			return product;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id" was required');
};

const deleteProductService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await productModel.findByIdAndDelete(id);
			return `product with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id"was required');
};

export {
	getProductService,
	getProductsService,
	createProductService,
	updateProductService,
	deleteProductService,
};
