import { Request } from "express";
import productModel from "../models/Products.Model";
import { extractDataFromJwtCookie } from "../utils/jwtutils";

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
			throw `${error}`;
		}
	}

	throw "no 'id' was provided";
};

const getProductsService = async (req: Request) => {
	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		const product = productModel
			.find(
				{ clientID: CookieData.clientID },
				"-__v -createdAt -updatedAt -prices._id",
			)
			.populate("department", "-createdAt -updatedAt -_id -__v -clientID");
		return product;
	} catch (error) {
		throw `${error}`;
	}
};

const createProductService = async (req: Request) => {
	const data = req.body;
	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		data.clienID = CookieData._id;
		const product = await productModel.create(data);
		return product;
	} catch (error) {
		throw `${error}`;
	}
};

const updateProductService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const current = await productModel.findOne({ id });
			if (!current) throw "Product not found";
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
			throw `${error}`;
		}
	}

	throw '"id" was required';
};

const deleteProductService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await productModel.findOneAndDelete({ id });
			return `product with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw '"id"was required';
};

interface updateValues {
	id: string,
	qty: number
}

const updateProductQty = async (ids: updateValues[]) => {
	for ( let i = 0; i < ids.length; i++ ) {
		try {
			console.log(ids[i])
			const product = await productModel.findById(ids[i].id)
			if(product) {
				product.toJSON()
				await productModel.findByIdAndUpdate(ids[i].id, { qty: product.qty - ids[i].qty });
			}
		} catch (error) {
			throw error
		}
	}
}

export {
	getProductService,
	getProductsService,
	createProductService,
	updateProductService,
	deleteProductService,
	updateProductQty
};
