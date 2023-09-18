import mongoose from "mongoose";
import { Client } from "./Client.interface";

export interface Customer extends mongoose.Document {
	rif: string;
	name: string;
	taxpayer: boolean;
	address: string;
	shippingAddress: string;
	phone: string[];
	contact: string;
	id: string;
	email: string;
	ClientId: string | Client;
}
