import { Request } from "express";
import sellerModel from "../models/Seller.Model";
import clientModel from "../models/Client.Model";

const loginService = async (req: Request) => {
	const { password, user } = req.body;
};

const logoutService = async (req: Request) => {};

export { loginService, logoutService };
