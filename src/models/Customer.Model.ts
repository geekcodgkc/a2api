import { Schema, model } from "mongoose";
import { Customer } from "../interfaces/Customers.interface";

const CustomerSchema = new Schema<Customer>({
    rif: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    taxpayer: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    phone: [{type: String}],
    contact: {
        type: String,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
},{timestamps: true});

const CustomerModel = model("Customer", CustomerSchema)
export default CustomerModel