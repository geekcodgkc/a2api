import "dotenv/config";
import bcrypt from "bcrypt";

const salts = process.env.SALT ? parseInt(process.env.SALT) : 10;

const hashpassword = async (password: string) => {
	if (typeof salts === "number") {
		try {
			const hash = await bcrypt.hash(password, salts);
			return hash;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("salts env variable is not a number");
};

const validateHash = async (hash: string, compare: string) => {
	if (typeof salts === "number") {
		try {
			const valid = await bcrypt.compare(hash, compare);
			return valid;
		} catch (error) {
			throw new Error(`${error}`);
		}
	}

	throw new Error("salts env variable is not a number");
};

export { hashpassword, validateHash };
