import { Request, Response } from "express";
import sellerModel from "../models/Seller.Model";
import clientModel from "../models/Client.Model";
import { decodeJWt, signToken } from "../utils/jwtutils";
import { validateHash } from "../utils/bcryptUtils";
import "dotenv/config";

const CookieName = `${process.env.TOKEN_NAME}`;
const ReconnectionTokenName = `${process.env.RECONNECT_TOKEN_NAME}`;
const reconnectionMaxAge = 60 * 60 * 24 * 1000;

const findSeller = async (id: string) => {
	try {
		const seller = await sellerModel.findOne({ id });
		return seller;
	} catch (error) {
		throw JSON.stringify(error);
	}
};

const findClient = async (id: string) => {
	try {
		const client = await clientModel.findOne({ rif: id });
		return client;
	} catch (error) {
		throw JSON.stringify(error);
	}
};

const createCookie = (
	res: Response,
	value: string,
	name?: string,
	maxAge?: number,
) => {
	res.cookie(name || CookieName, value, {
		maxAge: maxAge || 60 * 30 * 1000,
		httpOnly: true,
	});
};

const invalidUserError = "user or password invalid";

const loginService = async (req: Request, res: Response) => {
	const { password, user } = req.body;
	const seller = await findSeller(user);
	const client = await findClient(user);

	if (!seller && !client) throw invalidUserError;

	if (seller) {
		const isvalid = await validateHash(seller.password, password);
		if (!isvalid) throw invalidUserError;
		const clientId = await clientModel.findOne({
			sellers: seller._id.toString(),
		});

		if (!clientId) return invalidUserError;

		const cookieToken = signToken({
			email: seller.email,
			isAdmin: false,
			id: seller.id,
			_id: seller._id,
			clientId: clientId._id,
		});
		createCookie(res, cookieToken);
		// creamos la cookie de reconeccion

		const reconnectionToken = signToken({
			reconnectionId: clientId._id,
		});

		createCookie(
			res,
			reconnectionToken,
			ReconnectionTokenName,
			reconnectionMaxAge,
		);

		return cookieToken;
	}

	if (client) {
		const isvalid = await validateHash(client.password, password);
		if (!isvalid) throw invalidUserError;

		const cookieToken = signToken({
			email: client.email,
			isAdmin: true,
			id: client.rif,
			_id: client._id,
			clientId: client._id,
		});
		createCookie(res, cookieToken);

		// creamos el token de reconeccion
		const reconnectionToken = signToken({
			reconnectionId: client._id,
		});

		createCookie(
			res,
			reconnectionToken,
			ReconnectionTokenName,
			reconnectionMaxAge,
		);

		return cookieToken;
	}
};

const reloginService = async (
	res: Response,
	token: string,
	currentToken: string,
) => {
	const data = decodeJWt(token);
	const lastData = decodeJWt(currentToken);
	if (data && typeof data === "object") {
		const client = await clientModel.findById(data.reconnectionId);
		if (client && lastData && typeof lastData === "object") {
			const cookieToken = signToken({
				email: lastData.email,
				isAdmin: false,
				id: lastData.id,
				_id: lastData._id,
				clientId: client._id.toString(),
			});
			createCookie(res, cookieToken);

			const reconnectionToken = signToken({
				reconnectionId: client._id.toString(),
			});

			createCookie(
				res,
				reconnectionToken,
				ReconnectionTokenName,
				reconnectionMaxAge,
			);
			return true;
		}
	}
	return false;
};

const logoutService = (res: Response) => {
	res.clearCookie(CookieName);
	res.clearCookie(ReconnectionTokenName);
	return "logout successfully";
};

export { loginService, logoutService, reloginService };
