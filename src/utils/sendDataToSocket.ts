import api from "../api";

const sendData = async (route: string, method: string, data: object) => {
	switch (method) {
		case "POST":
			api.post(route, data);
			break;
		case "PUT":
			api.put(route, data);
			break;
		case "DELETE":
			api.delete(route, data);
			break;
		default:
			break;
	}
};
