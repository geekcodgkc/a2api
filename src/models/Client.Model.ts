import { Client } from "../interfaces/Client.interface";
import { Schema, model } from "mongoose";
import ZoneModel from "./Zone.Model";
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
		zone: {
			type: Schema.Types.ObjectId,
			ref: ZoneModel,
			required: true,
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
		conditionPrice: {
			type: Number,
			enum: [1, 2, 3, 4],
			required: true,
			default: 1,
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: SellerModel,
		},
		taxpayer: {
			type: Boolean,
			default: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
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
