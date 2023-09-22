import {
	createDepartmentService,
	getDepartmentService,
	getDepartmentsService,
	updateDepartmentService,
	deleteDepartmentService,
} from "../services/Deparment.Services";
import { Request, Response } from "express";
import { handleErrorHttp } from "../utils/handleErrorHttp";

const getDepartment = async (req: Request, res: Response) => {
	try {
		const response = await getDepartmentService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "something happend", error);
	}
};

const getDepartments = async (req: Request, res: Response) => {
	try {
		const response = await getDepartmentsService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "something happend", error);
	}
};

const createDepartment = async (req: Request, res: Response) => {
	try {
		const response = await createDepartmentService(req);
		res.json(response);
	} catch (error) {
		handleErrorHttp(res, "something happend", error);
	}
};

const updateDepartment = async (req: Request, res: Response) => {
	try {
		const response = updateDepartmentService(req);
		await res.json(response);
	} catch (error) {
		handleErrorHttp(res, "something happend", error);
	}
};

const deleteDepartment = async (req: Request, res: Response) => {
	try {
		const response = await deleteDepartmentService(req);
		res.json({ message: response });
	} catch (error) {
		handleErrorHttp(res, "something happend", error);
	}
};

export {
	deleteDepartment,
	createDepartment,
	updateDepartment,
	getDepartment,
	getDepartments,
};
