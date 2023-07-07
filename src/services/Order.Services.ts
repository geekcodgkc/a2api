import { Request } from "express";
import orderModel from "../models/Order.Model";
import sendDataToSocket from "../utils/sendDataToSocket";

const getOrderService = async (req: Request) => {
	const id = req.params.id;
	const populated = req.query.populated;

	if (id) {
		try {
			const order = populated
				? await orderModel
						.findById(id)
						.populate(
							[
								"products",
								"client",
								"client.zone",
								"client.seller",
								"product.product",
							],
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
			throw new Error(`${error}`);
		}
	}

	throw new Error("no 'id' was provided");
};

const getOrdersService = async (req: Request) => {
	const populated = req.query.populated;

	try {
		const order = populated
			? await orderModel
					.find()
					.populate("products.product", "-products.product.__v")
					.populate({
						path: "client",
						options: {
							password: 0,
						},
						populate: {
							path: "zone",
						},
					})
			: await orderModel.find().populate("products.product", "-product.__v");
		return order;
	} catch (error: unknown) {
		throw new Error(`${error}`);
	}
};

const createOrderService = async (req: Request) => {
	const data = req.body;
	try {
		const order = await orderModel.create(data);
		await order.populate("client");
		const message = {
			data: order.toJSON(),
			type: "order",
		};
		if (order) {
			sendDataToSocket("data", "POST", message);
		}
		return order;
	} catch (error) {
		throw new Error(`${error}`);
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

			if (order) {
				const message = {
					data: order.toJSON(),
					type: "order",
				};
				sendDataToSocket(`data/${order._id}`, "PUT", message);
			}
			return order;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id" was required');
};

const deleteOrderService = async (req: Request) => {
	const id = req.params.id;

	if (id) {
		try {
			await orderModel.findByIdAndDelete(id);
			return `order with id: "${id}" was removed succesfully`;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error('"id"was required');
};

export {
	getOrderService,
	getOrdersService,
	createOrderService,
	updateOrderService,
	deleteOrderService,
};
