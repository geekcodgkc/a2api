import { Order, ProductOrder } from "../interfaces/Order.interface";
import { Schema, model } from "mongoose";
import ProductModel from "./Products.Model";
import CustomerModel from "./Customer.Model";
import SellerModel from "./Seller.Model";

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
		qty: {
			type: Number,
			required: true,
			default: 1,
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
			ref: CustomerModel,
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
		orderNumber: {
			type: Number,
			required: true,
		},
		seller: {
			type: Schema.Types.ObjectId,
			ref: SellerModel,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const OrderModel = model("Orders", OrderSchema);
export default OrderModel;
