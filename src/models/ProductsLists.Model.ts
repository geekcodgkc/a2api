import { Schema, model } from "mongoose";
import { ProductsList } from "../interfaces/ProductsLists.interface";
import ProductModel from "./Products.Model";

const ProductsListSchema = new Schema<ProductsList>(
	{
		products: {
			type: [Schema.Types.ObjectId],
			ref: ProductModel,
			required: true,
		},
	},
	{ timestamps: true },
);

const ProductsListModel = model("ProductsList", ProductsListSchema);
export default ProductsListModel;
