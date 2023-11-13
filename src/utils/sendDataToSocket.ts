import api from "../api";
import "dotenv/config";

const TOKEN = `${process.env.TOKEN}`;

interface headersInterface {
	roomID: string;
	readID: string;
}

const sendData = async (
	route: string,
	method: string,
	data: object,
	headers: headersInterface,
) => {
	try {
		switch (method) {
			case "POST":
				await api.post(`/${route}`, data, {
					headers: {
						...headers,
						Authorization: `Bearer ${TOKEN}`,
					},
				});
				break;
			case "PUT":
				await api.put(`/${route}`, data);
				break;
			case "DELETE":
				await api.delete(`/${route}`, data);
				break;
			default:
				break;
		}
	} catch (e) {
		console.log("no se pudo enviar informacion al socket");
	}
};

export default sendData;
