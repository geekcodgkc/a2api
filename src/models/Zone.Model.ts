import { Zone } from "../interfaces/Zone.interface";
import { Schema, model } from "mongoose";

const ZoneSchema = new Schema<Zone>(
	{
		ZIPCode: {
			type: String,
			required: true,
		},
		area: {
			type: String,
			required: true,
		},
		State: {
			type: String,
			required: true,
			enum: [
				"AMAZONAS",
				"ANZOATEGUI",
				"APURE",
				"ARAGUA",
				"BARINAS",
				"BOLIVAR",
				"CARABOBO",
				"COJEDES",
				"DELTA AMACURO",
				"DISTRITO CAPITAL",
				"FALCON",
				"GUARICO",
				"LARA",
				"MERIDA",
				"MIRANDA",
				"MONAGAS",
				"NUEVA ESPARTA",
				"PORTUGUESA",
				"SUCRE",
				"TACHIRA",
				"TRUJILLO",
				"VARGAS",
				"YARACUY",
				"ZULIA",
			],
		},
	},
	{
		timestamps: true,
	},
);

const ZoneModel = model("Zones", ZoneSchema);
export default ZoneModel;
