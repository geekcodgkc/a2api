import mongoose from "mongoose";
import { Product } from "./Products.interface";

export interface ProductsList extends mongoose.Document {
	products: [string | Product];
}
