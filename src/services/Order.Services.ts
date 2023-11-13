import { Request } from "express";
import orderModel from "../models/Order.Model";
import sendDataToSocket from "../utils/sendDataToSocket";
import { updateProductQty } from "./Product.Services";
import { ProductOrder } from "../interfaces/Order.interface";
import { extractDataFromJwtCookie } from "../utils/jwtutils";

const getOrderService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.query.populated;

	if (id) {
		try {
			const order = populated
				? await orderModel
						.findById(id)
						.populate(
							["products", "client", "client.seller", "product.product"],
							{
								client: {
									password: 0,
									seller: {
										password: 0,
									},
								},
							},
						)
				: await orderModel.findById(id).populate("products");
			return order;
		} catch (error: unknown) {
			throw `${error}`;
		}
	}

	throw "no 'id' was provided";
};

const getOrdersService = async (req: Request) => {
	const populated = req.query.populated;

	try {
		const order = populated
			? await orderModel
					.find()
					.sort({ createdAt: "desc" })
					.populate("products.product", "-products.product.__v")
					.populate({
						path: "client",
						options: {
							password: 0,
						},
					})
			: await orderModel
					.find()
					.sort({ createdAt: "desc" })
					.populate("products.product", "-product.__v");
		return order;
	} catch (error: unknown) {
		throw `${error}`;
	}
};

const getOrdersByClientService = async (req: Request) => {
	const id = req.params.id;

	try {
		const order = await orderModel
			.find({ client: id })
			.sort({ createdAt: "desc" })
			.populate("products.product", "-products.product.__v")
			.populate({
				path: "client",
				options: {
					password: 0,
				},
			});
		return order;
	} catch (error: unknown) {
		throw `${error}`;
	}
};

const createOrderService = async (req: Request) => {
	const data = req.body;
	const clientData = extractDataFromJwtCookie(`${req.headers.cookie}`);

	try {
		const count = await orderModel.countDocuments();
		data.orderNumber = count + 1;
		const order = await orderModel.create(data);

		await updateProductQty(
			data.products.map((p: ProductOrder) => ({
				id: p.product,
				qty: p.qty,
			})),
		);

		await order.populate(["client", "products.product"]);
		const message = {
			data: order.toJSON(),
			type: "order",
		};
		if (order) {
			const roomID = typeof clientData === "object" ? clientData?.clientID : "";
			sendDataToSocket("orders", "POST", message, {
				readID: data.seller,
				roomID,
			});
		}
		return order;
	} catch (error) {
		throw `${error}`;
	}
};

const updateOrderService = async (req: Request) => {
	const data = req.body;
	const id = req.params.id;

	if (id) {
		try {
			const order = await orderModel
				.findByIdAndUpdate(id, data, {
					new: true,
				})
				.populate("products", "-_id")
				.populate("products.product");
			return order;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw '"id" was required';
};

const deleteOrderService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await orderModel.findByIdAndDelete(id);
			return `order with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw `${error}`;
		}
	}

	throw '"id"was required';
};

export {
	getOrderService,
	getOrdersService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
	getOrdersByClientService,
};
