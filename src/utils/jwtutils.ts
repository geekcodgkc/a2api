import jwt, { JwtPayload } from "jsonwebtoken/index";
import "dotenv/config";

interface cookieData extends JwtPayload {
	_id: string;
	isAdmin: boolean;
	id: string;
	iat: number;
	exp: number;
}

interface jwtError {
	name: string;
	message: string;
}

const SECRET = process.env.SECRET;
const ALG = "HS256";
const TIME = process.env.COOKIE_TIME
	? parseInt(process.env.COOKIE_TIME) * 30
	: 60000 * 30;

const signToken = (data: Object): string => {
	const response = jwt.sign(data, `${SECRET}`, {
		algorithm: ALG,
		expiresIn: TIME.toString(),
	});

	return response;
};

const verifyToken = (token: string): boolean | jwtError => {
	let verify;
	jwt.verify(token, `${SECRET}`, (err, decoded) => {
		if (err) {
			throw err;
		}

		verify = decoded;
	});

	return verify ? true : false;
};

const decodeJWt = (jwtToken: string) => {
	return jwt.decode(jwtToken);
};

const extracDataFromJwtCookie = (cookies: string) => {
	const token = cookies
		.split(";")
		.find((element) => element.includes("_token"));
	const jwtToken = token?.split("=").pop();
	const decoded: cookieData | null | string | JwtPayload = jwt.decode(
		`${jwtToken}`,
	);
	return decoded;
};

export { verifyToken, signToken, extracDataFromJwtCookie, decodeJWt };
