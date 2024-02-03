import mongoose from "mongoose";

export interface Discount extends mongoose.Document {
	name: string;
	percent: number;
	global: boolean; //este valor permite ver si el descuento
	// es sobre el total de la factura o a
	// cada producto de manera individual
}

/*
 * cada precio tendra un configurador con un numero
 * configurable de escalas de precio que tomara las listas de
 * precio en las descripciones de los productos
 * en caso de que el numero de escalas sea mayor al total
 * de precios en el producto este tomara el precio menor
 * segun el total de kilos en la orden valla aumentando
 *
 */

export interface PriceScales extends mongoose.Document {
	MinKg: number;
}

export interface Config extends mongoose.Document {
	Discounts: Discount[];
	PriceScales: PriceScales[];
}
