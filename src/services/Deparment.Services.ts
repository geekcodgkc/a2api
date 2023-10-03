import DeparmentModel from "../models/Department.Model";
import { Request } from "express";
import { extractDataFromJwtCookie } from "../utils/jwtutils";

const createDepartmentService = async (req: Request) => {
	try {
		const department = await DeparmentModel.create(req.body);
		return department;
	} catch (error) {
		throw `${error}`;
	}
};

const getDepartmentService = async (req: Request) => {
	try {
		const id = req.params.id;
		const deparment = await DeparmentModel.findById(id);
		return deparment;
	} catch (error) {
		throw `${error}`;
	}
};

const getDepartmentsService = async (req: Request) => {
	try {
		const CookieData = extractDataFromJwtCookie(`${req.headers.cookie}`);
		if (!CookieData || typeof CookieData !== "object") return "cookie invalid";
		const deparments = await DeparmentModel.find({
			clientID: CookieData.clientID,
		});
		return deparments;
	} catch (error) {
		throw `${error}`;
	}
};

const updateDepartmentService = async (req: Request) => {
	try {
		const id = req.params.id;
		const updated = await DeparmentModel.findByIdAndUpdate(id, req.body);
		return updated;
	} catch (error) {
		throw `${error}`;
	}
};

const deleteDepartmentService = async (req: Request) => {
	try {
		const id = req.params._id;
		await DeparmentModel.findByIdAndDelete(id);
		return `department with id: ${id} was succesfully deleted`;
	} catch (error) {
		throw `${error}`;
	}
};

export {
	createDepartmentService,
	getDepartmentService,
	getDepartmentsService,
	updateDepartmentService,
	deleteDepartmentService,
};
