import { Product, Price } from "../interfaces/Products.interface";
import { Schema, model } from "mongoose";
import ClientModel from "./Client.Model";
import DeparmentModel from "./Department.Model";

const PricesSchemas = new Schema<Price>(
	{
		p1: {
			price: {
				type: Number,
				default: 0,
			},
			range: {
				type: Number,
				default: 0,
			},
		},
		p2: {
			price: {
				type: Number,
				default: 0,
			},
			range: {
				type: Number,
				default: 0,
			},
		},
		p3: {
			price: {
				type: Number,
				default: 0,
			},
			range: {
				type: Number,
				default: 0,
			},
		},
		p4: {
			price: {
				type: Number,
				default: 0,
			},
			range: {
				type: Number,
				default: 0,
			},
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
		clientID: {
			type: Schema.Types.ObjectId,
			ref: ClientModel,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		prices: PricesSchemas,
		department: [
			{
				type: Schema.Types.ObjectId,
				ref: DeparmentModel,
			},
		],
		tax: {
			type: Number,
			required: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		qty: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const ProductModel = model("Products", ProductSchema);
export default ProductModel;
