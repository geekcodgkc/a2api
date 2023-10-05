import mongoose from "mongoose";
import { Client } from "./Client.interface";

export interface Price extends mongoose.Document {
	p1: number;
	p2: number;
	p3: number;
	p4: number;
}

export interface Product extends mongoose.Document {
	id: string;
	clientID: string | Client;
	name: string;
	prices: Price;
	department: [string] | [];
	qty: number;
	status: boolean;
	description: string;
	tax: number;
}
