import mongoose from "mongoose";
import { Zone } from "./Zone.interface";
import { Seller } from "./Seller.interface";

enum Condition {
	p1 = 1,
	p2 = 2,
	p3 = 3,
	p4 = 4,
}

/*
	p1 = precio mas alto
	p2 = precio intermedio
	p3 = precio mas bajo
	p4 = precio unilevel (este cliente solo puede ver los 
		productos que se le habiliten)
*/

export interface ClientForm {
	rif: string;
	name: string;
	address: string;
	email: string;
	zone: Zone | string;
	phone: number[];
	contact: string;
	password: string;
	totalKg: number;
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
	totalKg: number;
}
