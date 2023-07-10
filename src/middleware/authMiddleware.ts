import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwtutils";

const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
	const { authorization, cookie } = req.headers;
	let cookieToken;

	const extractBearer = authorization ? authorization.split(" ").pop() : null;
	const extractCookie = cookie
		?.split(";")
		.find((Element) => Element.includes("token"));
	if (extractCookie) {
		cookieToken = extractCookie.split("=").pop();
	}

	if (!extractBearer && !cookieToken) {
		next();
		/*
		res.status(401);
		res.json({ error: "no token or cookie for auth" });
		*/
		return;
	}

	if (extractBearer) {
		const auth = verifyToken(extractBearer);
		console.log(auth);
		auth ? next() : res.status(401);
		return;
	}

	if (cookieToken) {
		const auth = verifyToken(cookieToken);
		console.log(auth);
		auth ? next() : res.status(401);
		return;
	}
};

export default handleAuth;
