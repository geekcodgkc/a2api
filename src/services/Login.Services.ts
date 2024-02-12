import { Request, Response } from "express";
import sellerModel from "../models/Seller.Model";
import clientModel from "../models/Client.Model";
import { signToken } from "../utils/jwtutils";
import { validateHash } from "../utils/bcryptUtils";

const CookieName = "token";

const findSeller = async (id: string) => {
	try {
		const seller = await sellerModel.findOne({ id });
		return seller;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

const findClient = async (id: string) => {
	try {
		const client = await clientModel.findOne({ rif: id });
		return client;
	} catch (error) {
		throw new Error(JSON.stringify(error));
	}
};

const createCookie = (res: Response, value: string) => {
	res.cookie(CookieName, value, {
		maxAge: 60 * 30 * 1000,
		httpOnly: true,
	});
};

const invalidUserError = "user or password invalid";

const loginService = async (req: Request, res: Response) => {
	const { password, user } = req.body;
	const seller = await findSeller(user);
	const client = await findClient(user);

	if (!seller && !client) throw new Error(invalidUserError);

	if (seller) {
		const isvalid = await validateHash(seller.password, password);
		if (!isvalid) throw new Error(invalidUserError);

		const cookieToken = signToken({
			email: seller.email,
			isAdmin: true,
			id: seller.id,
			_id: seller._id,
			isSuper: seller.isSuper,
		});
		createCookie(res, cookieToken);
		return cookieToken;
	}

	if (client) {
		const isvalid = await validateHash(client.password, password);
		if (!isvalid) throw new Error(invalidUserError);

		const cookieToken = signToken({
			email: client.email,
			isAdmin: false,
			id: client.rif,
			_id: client._id,
			totalKG: client.totalKg,
			verified: true,
		});
		createCookie(res, cookieToken);
		return cookieToken;
	}
};

const logoutService = (res: Response) => {
	res.clearCookie(CookieName);
	return "logout successfully";
};

export { loginService, logoutService };
