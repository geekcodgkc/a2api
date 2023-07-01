import { Seller } from "../interfaces/Seller.interface";
import { Schema, model } from "mongoose";

const SellerSchema = new Schema<Seller>(
	{
		name: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
		versionKey: true,
	},
);

const SellerModel = model("Sellers", SellerSchema);
export default SellerModel;
