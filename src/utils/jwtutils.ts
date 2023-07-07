import jwt from "jsonwebtoken/index";
import "dotenv/config";

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

const verifyToken = (token: string): boolean => {
	let verify;
	jwt.verify(token, `${SECRET}`, (err, decoded) => {
		if (err) {
			throw new Error(JSON.stringify(err));
		}

		verify = decoded;
	});

	return verify ? true : false;
};

export { verifyToken, signToken };
