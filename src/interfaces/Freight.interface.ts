import mongoose from "mongoose";
import { Zone } from "./Zone.interface";

export interface Freight extends mongoose.Document {
	cod: Zone | string;
	price: number;
}
