import { Request } from "express";
import productModel from "../models/Products.Model";

const getProductService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			const product = await productModel.findOne(
				{ id },
				"-__v -createdAt -updatedAt -prices._id",
			);
			return product;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getProductsService = async (req: Request) => {
	try {
		const product = productModel.find(
			{},
			"-__v -createdAt -updatedAt -prices._id",
		);
		return product;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const createProductService = async (req: Request) => {
	const data = req.body;
	try {
		const product = await productModel.insertMany(data);
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
			const current = await productModel.findOne({ id });
			if (!current) throw new Error("Product not found");
			const parsed = current.toJSON();
			const updated = {
				...parsed,
				...data,
				prices: { ...parsed.prices, ...data.prices },
			};
			const product = await productModel.findOneAndUpdate({ id }, updated, {
				new: true,
				fields: "-__v -updatedAt -createdAt -prices._id",
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
			await productModel.findOneAndDelete({ id });
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
