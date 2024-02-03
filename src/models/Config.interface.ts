import { Schema, model } from "mongoose";
import { PriceScales, Config, Discount } from "../interfaces/Config.interface";

const PriceScalesSchema = new Schema<PriceScales>(
	{
		MinKg: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

const DiscountSchema = new Schema<Discount>({
	name: {
		type: String,
		required: true,
	},
	percent: {
		type: Number,
		required: true,
	},
	global: {
		type: Boolean,
		default: false,
	},
});

const ConfigSchema = new Schema<Config>(
	{
		PriceScales: [
			{
				type: PriceScalesSchema,
				required: true,
			},
		],
		Discounts: [
			{
				type: DiscountSchema,
				required: true,
			},
		],
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

const ConfigModel = model("Config", ConfigSchema);
export default ConfigModel;
