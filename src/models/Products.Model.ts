import { Product } from "../interfaces/Products.interface";
import { Schema, model } from "mongoose";

const ValidateLen = (length: number[]) => {
	const totalLength = 4;
	return length.length === totalLength;
};

const ProductSchema = new Schema<Product>(
	{
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		prices: {
			type: [Number],
			validate: [ValidateLen, "debe contener 4 escalas de precios"],
			required: true,
		},
		department: String,
		presentation: {
			type: String,
			enum: ["caja15kg", "carboya", "tina", "paila", "botella", "granel"],
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: true,
	},
);

const ProductModel = model("Products", ProductSchema);
export default ProductModel;
