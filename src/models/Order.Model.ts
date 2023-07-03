import { Order, ProductOrder } from "../interfaces/Order.interface";
import { Schema, model } from "mongoose";
import ProductModel from "./Products.Model";
import ClientModel from "./Client.Model";

const ProductSaleSchema = new Schema<ProductOrder>(
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: ProductModel,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: false,
		versionKey: false,
	},
);

const OrderSchema = new Schema<Order>(
	{
		products: [ProductSaleSchema],
		client: {
			type: Schema.Types.ObjectId,
			ref: ClientModel,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		shippingDate: {
			type: Date,
			required: true,
		},
		orderTotal: {
			type: Number,
			required: true,
		},
		iva: {
			type: Number,
			required: true,
		},
		orderBase: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			enum: [0, 1, 2],
			default: 0,
		},
		shippingAddress: {
			type: String,
			required: true,
			max: 120,
		},
	},
	{
		timestamps: true,
	},
);

const OrderModel = model("Orders", OrderSchema);
export default OrderModel;
