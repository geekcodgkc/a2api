import { Request } from "express";
import sellerModel from "../models/Seller.Model";
import { hashpassword } from "../utils/bcryptUtils";

const getSellerService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			const seller = await sellerModel.findById(id, { password: 0 });
			return seller;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getSellersService = async (req: Request) => {
	try {
		const seller = sellerModel.find({}, { password: 0 });
		return seller;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const createSellerService = async (req: Request) => {
	const data = req.body;
	try {
		const password = await hashpassword(data.password);
		data.password = password;
		const seller = await sellerModel.create(data);
		return seller;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const updateSellerService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const seller = await sellerModel.findByIdAndUpdate(id, data, {
				new: true,
				fields: "-password",
			});
			return seller;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id" was required');
};

const deleteSellerService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await sellerModel.findByIdAndDelete(id);
			return `seller with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id"was required');
};

export {
	getSellerService,
	getSellersService,
	createSellerService,
	updateSellerService,
	deleteSellerService,
};
