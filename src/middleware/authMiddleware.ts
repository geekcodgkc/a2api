import { NextFunction, Request, Response } from "express";

const handleAuth = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.headers);
	console.log(req.cookies);
	next();
};

export default handleAuth;
