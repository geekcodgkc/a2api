import mongoose from "mongoose";
import { Client } from "./Client.interface";

export interface Department extends mongoose.Document {
	name: string;
	clientID: string | Client;
}
