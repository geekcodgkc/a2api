import jwt from "jsonwebtoken/index";
import "dotenv/config";

const SECRET = process.env.SECRET;
const ALG = "HS256";
const TIME = process.env.COOKIE_TIME
	? parseInt(process.env.COOKIE_TIME) * 30
	: 60000 * 30;

const signToken = async (data: Object) => {
	jwt.sign(
		data,
		`${SECRET}`,
		{
			algorithm: ALG,
			expiresIn: TIME.toString(),
		},
		(err, token) => {
			if (err) {
				throw new Error(JSON.stringify(err));
			}

			return token;
		},
	);
};

const verifyToken = async (token: string) => {
	jwt.verify(token, `${SECRET}`, (err, decoded) => {
		if (err) {
			throw new Error(JSON.stringify(err));
		}

		return decoded;
	});
};

export = { verifyToken, signToken };
