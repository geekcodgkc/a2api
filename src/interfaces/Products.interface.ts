import mongoose from "mongoose";

type Price = [number, number, number, number];

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
}
