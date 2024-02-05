import ProductModel from "../models/Products.Model";

interface products {
	id: string;
	amount: number;
}

const sumWeigth = async (products: products[]) => {
	let totalKg = 0;

	try {
		for (let i = 0; i < products.length; i++) {
			const product = await ProductModel.findById(products[i].id, "netWeight");
			if (product) {
				const total = product.netWeight * products[i].amount;
				totalKg += total;
			}
		}

		return totalKg;
	} catch (error) {
		console.log(error);
	}
};

export default sumWeigth;
