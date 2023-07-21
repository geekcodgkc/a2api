import api from "../api";

const sendData = async (route: string, method: string, data: object) => {
	try {
		switch (method) {
			case "POST":
				await api.post(`/${route}`, data);
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
