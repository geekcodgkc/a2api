import mongoose from "mongoose";

export interface Customer extends mongoose.Document {
    rif: string
    name: string
    taxpayer: boolean
    address: string
    shippingAddress: string
    phone: string[]
    contact: string
    id: string
    email: string
}