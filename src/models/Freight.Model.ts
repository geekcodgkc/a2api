import { Freight } from "../interfaces/Freight.interface";
import { Schema, model } from "mongoose";
import ZoneModel from "./Zone.Model";

const FreightSchema = new Schema<Freight>(
	{
		cod: {
			type: Schema.Types.ObjectId,
			ref: ZoneModel,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const FreightModel = model("Freights", FreightSchema);
export default FreightModel;
