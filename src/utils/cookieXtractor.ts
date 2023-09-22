import { Request } from "express";
import "dotenv/config";

const CookieName = `${process.env.TOKEN_NAME}`;
const ReconnectionTokenName = `${process.env.RECONNECT_TOKEN_NAME}`;

const cookieXtractor = (req: Request) => {
	const cookie = req.headers.cookie;
	let token;
	let reconnectToken;

	const extractCookie = cookie
		?.split(";")
		.filter((Element) => {
			return (
				Element.includes(CookieName) || Element.includes(ReconnectionTokenName)
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
