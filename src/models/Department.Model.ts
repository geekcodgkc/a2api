import { Department } from "../interfaces/Department.interface";
import { Schema, model } from "mongoose";
import ClientModel from "./Client.Model";

const DepartmentSchema = new Schema<Department>(
	{
		name: {
			type: String,
			required: true,
		},
		clientID: {
			type: Schema.Types.ObjectId,
			ref: ClientModel,
			required: true,
		},
	},
	{ timestamps: true },
);

const DeparmentModel = model("Departments", DepartmentSchema);
export default DeparmentModel;
