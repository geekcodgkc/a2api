import mongoose from "mongoose";

export interface Seller extends mongoose.Document {
	name: string;
	id: string;
	phone: string;
	email: string;
	password: string;
}
