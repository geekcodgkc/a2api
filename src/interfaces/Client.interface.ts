import mongoose from "mongoose";
import { Zone } from "./Zone.interface";
import { Seller } from "./Seller.interface";

enum Condition {
	p1 = 1,
	p2 = 2,
	p3 = 3,
	p4 = 4,
}

export interface Client extends mongoose.Document {
	rif: string;
	name: string;
	address: string;
	email: string;
	zone: Zone | string;
	phone: number[];
	contact: string;
	conditionPrice: Condition;
	seller: Seller | null;
	taxpayer: boolean;
	verified: boolean;
	password: string;
}
