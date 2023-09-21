import { Request } from "express";

const cookieXtractor = (req: Request) => {
	const cookie = req.headers.cookie;
	let token;
	let reconnectToken;

	const extractCookie = cookie
		?.split(";")
		.filter((Element) => {
			return (
				Element.includes("_token") || Element.includes("_reconnectionToken")
			);
		})
		.map((cookieData) => cookieData.split("=").pop());

	if (extractCookie?.[0] && extractCookie[1]) {
		token = extractCookie[0];
		reconnectToken = extractCookie[1];
	}

	return [`${token}`, `${reconnectToken}`];
};

export default cookieXtractor;
