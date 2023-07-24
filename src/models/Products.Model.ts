import { Product, Price } from "../interfaces/Products.interface";
import { Schema, model } from "mongoose";

const PricesSchemas = new Schema<Price>(
	{
		p1: {
			type: Number,
			required: true,
		},
		p2: {
			type: Number,
			required: true,
		},
		p3: {
			type: Number,
			required: true,
		},
		p4: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

const ProductSchema = new Schema<Product>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		prices: PricesSchemas,
		department: String,
		tax: {
			type: Number,
			required: true,
			enum: [0, 8, 16] 
		},
		presentation: {
			type: String,
			enum: [
				"caja15kg",
				"carboya",
				"tina",
				"paila",
				"botella",
				"granel",
				"CAJA 05KG",
				"CAJA 10KG",
				"CAJA 15KG",
				"CAJA 24X200GR",
				"CAJA 24X250GR",
				"BULTO 12X1LT",
				"BULTO 24X500ML",
				"BULTO 12X850ML",
				"PAILA 18LT",
				"PAILA 15LT",
				"CAJA",
				"PAILA",
				"BULTO",
				"CARBOYA",
				"KG",
				"UND"
			],
			required: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

const ProductModel = model("Products", ProductSchema);
export default ProductModel;
