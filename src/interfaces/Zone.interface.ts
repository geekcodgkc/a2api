import mongoose from "mongoose";

enum State {
	Amazonas = "AMAZONAS",
	Anzoategui = "ANZOATEGUI",
	Apure = "APURE",
	Aragua = "ARAGUA",
	Barinas = "BARINAS",
	Bolivar = "BOLIVAR",
	Carabobo = "CARABOBO",
	Cojedes = "COJEDES",
	Delta = "DELTA AMACURO",
	Distrito = "DISTRITO CAPITAL",
	Falcon = "FALCON",
	Guarico = "GUARICO",
	Lara = "LARA",
	Merida = "MERIDA",
	Miranda = "MIRANDA",
	Monagas = "MONAGAS",
	NuevaEsparta = "NUEVA ESPARTA",
	Portuguesa = "PORTUGUESA",
	Sucre = "SUCRE",
	Tachira = "TACHIRA",
	Trujillo = "TRUJILLO",
	Vargas = "VARGAS",
	Yaracuy = "YARACUY",
	Zulia = "ZULIA",
}

export interface Zone extends mongoose.Document {
	ZIPCode: string;
	State: State;
	area: string;
}
