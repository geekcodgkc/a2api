import mongoose from "mongoose";
import { Zone } from "./Zone.interface";
import { Seller } from "./Seller.interface";

export interface ClientForm {
	rif: string;
	name: string;
	address: string;
	email: string;
	zone: Zone | string;
	phone: number[];
	contact: string;
	password: string;
}

export interface Client extends mongoose.Document {
	rif: string;
	name: string;
	address: string;
	email: string;
	phone: number[];
	contact: string;
	sellers: [Seller] | [string] | [];
	verified: boolean;
	password: string;
}
