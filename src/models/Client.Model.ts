import { Client } from "../interfaces/Client.interface";
import { Schema, model } from "mongoose";
import SellerModel from "./Seller.Model";

const ValidateLen = (length: number[]) => {
	const maxLength = 2;
	return length.length <= maxLength;
};

const ClientSchema = new Schema<Client>(
	{
		rif: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: [String],
			required: true,
			validate: ValidateLen,
		},
		contact: {
			type: String,
			required: true,
		},
		sellers: [
			{
				type: Schema.Types.ObjectId,
				ref: SellerModel,
			},
		],
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const ClientModel = model("Clients", ClientSchema);
export default ClientModel;
