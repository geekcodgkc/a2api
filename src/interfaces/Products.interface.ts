import mongoose from "mongoose";
import { Department } from "./Deparmet.interface";
import { Client } from "./Client.interface";

export interface Price extends mongoose.Document {
	p1: {
		price: number;
		range: number;
	};
	p2: {
		price: number;
		range: number;
	};
	p3: {
		price: number;
		range: number;
	};
	p4: {
		price: number;
		range: number;
	};
}

export interface Product extends mongoose.Document {
	id: string;
	clientID: string | Client;
	name: string;
	prices: Price;
	department: [string] | [Department] | [];
	qty: string;
	status: boolean;
	description: string;
	tax: number;
}
