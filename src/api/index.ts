import axios from "axios";
import "dotenv/config";

const api = axios.create({
	baseURL: `${process.env.SOCKET_URI}`,
});

export default api;
