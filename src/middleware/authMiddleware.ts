import { NextFunction, Request, Response } from "express";
import { decodeJWt, verifyToken } from "../utils/jwtutils";
import "dotenv/config";
import cookieXtractor from "../utils/cookieXtractor";
import { reloginService } from "../services/Login.Services";

const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;
	const token = process.env.TOKEN;

	const extractBearer = authorization ? authorization.split(" ").pop() : null;

	// buscar cookie entre las muchas que puedan llegar de la peticion
	const [extractCookie, extractReconnectionToken] = cookieXtractor(req);

	if ((!extractBearer && extractCookie) || !extractBearer) {
		res.status(401);
		res.json({ error: "no token or cookie for auth" });
		return;
	}

	if (extractBearer && extractCookie) {
		const auth = extractBearer === token;
		let authCookie;

		try {
			authCookie = verifyToken(extractCookie);
		} catch (error) {
			console.log(decodeJWt(extractReconnectionToken));
			const reloged = await reloginService(res, extractReconnectionToken);
			if (reloged) {
				next();
				return;
			}
			res.status(401);
			res.json({ message: "unauthorized" });
		}

		auth && authCookie ? next() : res.status(401);
		return;
	}

	if (extractBearer) {
		const auth = extractBearer === token;
		auth ? next() : res.status(401);
		return;
	}
};

export default handleAuth;
