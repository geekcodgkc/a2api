import mongoose from "mongoose";

export interface Price extends mongoose.Document {
	p1: number;
	p2: number;
	p3: number;
	p4: number;
}

enum Tax {
	tax1 = 0,
	tax2 = 8,
	tax3 = 16,
}

enum presentations {
	caja15kg = "caja15kg",
	carboya = "carboya",
	tina = "tina",
	paila = "paila",
	botella = "botella",
	granel = "granel",
	CAJA05KG = "CAJA 05KG",
	CAJA10KG = "CAJA 10KG",
	CAJA15KG = "CAJA 15KG",
	CAJA24X200GR = "CAJA 24X200GR",
	CAJA24X250GR = "CAJA 24X250GR",
	BULTO12X1LT = "BULTO 12X1LT",
	BULTO24X500ML = "BULTO 24X500ML",
	BULTO12X850ML = "BULTO 12X850ML",
	PAILA18LT = "PAILA 18LT",
	PAILA15LT = "PAILA 15LT",
	CAJA = "CAJA",
	PAILA = "PAILA",
	BULTO = "BULTO",
	CARBOYA = "CARBOYA",
	KG = "KG",
	UND = "UND"
}

export interface Product extends mongoose.Document {
	id: string;
	name: string;
	prices: Price;
	department: string | null;
	presentation: presentations;
	netWeight: number;
	status: boolean;
	tax: Tax
}
