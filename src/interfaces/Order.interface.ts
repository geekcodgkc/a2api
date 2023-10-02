import mongoose from "mongoose";
import { Product } from "./Products.interface";
import { Customer } from "./Customers.interface";
import { Seller } from "./Seller.interface";

enum Status {
	status1 = 0,
	status2 = 1,
	status3 = 2,
}

export interface ProductOrder extends mongoose.Document {
	product: Product | string;
	price: number;
	qty: number;
}

export interface Order extends mongoose.Document {
	products: ProductOrder[];
	client: Customer | string;
	seller: Seller | string;
	date: Date;
	shippingDate: Date;
	orderTotal: number;
	iva: number;
	orderBase: number;
	status: Status;
	shippingAddress: string;
	orderNumber: number;
}
