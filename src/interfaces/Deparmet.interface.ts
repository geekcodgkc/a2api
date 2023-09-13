import mongoose from "mongoose";

export interface Department extends mongoose.Document {
	name: string;
}
