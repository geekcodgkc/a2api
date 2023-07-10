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
		presentation: {
			type: String,
			enum: ["caja15kg", "carboya", "tina", "paila", "botella", "granel"],
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
