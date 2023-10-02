import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";
import { loginService, logoutService } from "../services/Login.Services";

const login = async (req: Request, res: Response) => {
	try {
		const response = await loginService(req, res);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

const logout = async (_req: Request, res: Response) => {
	try {
		const response = logoutService(res);
		res.json({ response });
	} catch (error) {
		handleErrorHttp(res, "hubo un error", error);
	}
};

export { login, logout };
