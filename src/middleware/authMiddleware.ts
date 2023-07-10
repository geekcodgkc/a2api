import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtutils";
import "dotenv/config";

const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization, cookie } = req.headers;
	let cookieToken;
	const token = process.env.TOKEN;

	const extractBearer = authorization ? authorization.split(" ").pop() : null;
	const extractCookie = cookie
		?.split(";")
		.find((Element) => Element.includes("token"));
	if (extractCookie) {
		cookieToken = extractCookie.split("=").pop();
	}

	if (!extractBearer && !cookieToken) {
		res.status(401);
		res.json({ error: "no token or cookie for auth" });
		return;
	}

	if (extractBearer) {
		const auth = extractBearer === token;
		auth ? next() : res.status(401);
		return;
	}

	if (cookieToken) {
		const auth = verifyToken(cookieToken);
		auth ? next() : res.status(401);
		return;
	}
};

export default handleAuth;
