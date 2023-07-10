import mongoose from "mongoose";

export interface Price extends mongoose.Document {
	p1: number;
	p2: number;
	p3: number;
	p4: number;
}

enum presentations {
	caja15kg = "caja15kg",
	carboya = "carboya",
	tina = "tina",
	paila = "paila",
	botella = "botella",
	granel = "granel",
}

export interface Product extends mongoose.Document {
	id: string;
	name: string;
	prices: Price;
	department: string | null;
	presentation: presentations;
	netWeight: number;
	status: boolean;
}
