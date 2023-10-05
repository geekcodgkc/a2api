import { Request } from "express";
import sellerModel from "../models/Seller.Model";
import { hashpassword } from "../utils/bcryptUtils";
import { noId } from "../config/ErrorTypes";
import { extractDataFromJwtCookie } from "../utils/jwtutils";
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
			throw `${error}`;
		}
	}

	throw noId;
};

const getSellersService = async (req: Request) => {
	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		const sellers = await ClientModel.findById(CookieData.clientID).populate(
			"sellers",
		);
		sellers?.toJSON();
		return sellers?.sellers;
	} catch (error) {
		throw `${error}`;
	}
};

const createSellerService = async (req: Request) => {
	const data = req.body;
	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		const password = await hashpassword(data.password);
		data.password = password;
		const seller = await sellerModel.create(data);
		const client = await ClientModel.findById(CookieData._id);
		seller.toJSON();
		client?.toJSON();

		if (client && seller) {
			const sellers = [...client.sellers];
			sellers.push(seller._id.toString());
			await ClientModel.findByIdAndUpdate(CookieData._id, { sellers });
		}

		return seller;
	} catch (error) {
		throw `${error}`;
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
			throw `${error}`;
		}
	}

	throw noId;
};

const deleteSellerService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await sellerModel.findByIdAndDelete(id);
			return `seller with id: '${id}' was removed succesfully`;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw noId;
};

export {
	getSellerService,
	getSellersService,
	createSellerService,
	updateSellerService,
	deleteSellerService,
};
