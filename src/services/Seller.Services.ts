import { Request } from "express";
import sellerModel from "../models/Seller.Model";
import { hashpassword } from "../utils/bcryptUtils";
import { noId } from "../config/ErrorTypes";
import { extracDataFromJwtCookie } from "../utils/jwtutils";
import ClientModel from "../models/Client.Model";

const getSellerService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			const seller = await sellerModel.findOne(
				{ id },
				"-password -__v -createdAt -updatedAt",
			);
			return seller;
		} catch (error: unknown) {
			throw new Error(`${error}`);
		}
	}

	throw new Error(noId);
};

const getSellersService = async () => {
	try {
		const seller = sellerModel.find(
			{},
			{ password: 0, __v: 0, createdAt: 0, updatedAt: 0 },
		);
		return seller;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const createSellerService = async (req: Request) => {
	const data = req.body;
	console.log(req.headers.cookie);
	try {
		const CookieData = extracDataFromJwtCookie(`${req.headers.cookie}`);
		console.log(typeof CookieData);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		const password = await hashpassword(data.password);
		data.password = password;
		const seller = await sellerModel.create(data);
		const client = await ClientModel.findById(CookieData._id);
		seller.toJSON();
		console.log(seller._id.toString());
		client?.toJSON();

		if (client && seller) {
			const sellers = [...client.sellers];
			sellers.push(seller._id.toString());
			console.log(sellers);
			const updatedClient = await ClientModel.findByIdAndUpdate(
				CookieData._id,
				{ sellers },
			);
			console.log(updatedClient?.populate("sellers"));
		}

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
			const seller = await sellerModel.findOneAndUpdate({ id }, data, {
				new: true,
				fields: "-password -__V -updatedAt -createdAt",
			});
			return seller;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error(noId);
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

	throw new Error(noId);
};

export {
	getSellerService,
	getSellersService,
	createSellerService,
	updateSellerService,
	deleteSellerService,
};
