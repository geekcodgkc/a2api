import "dotenv/config";
import bcrypt from "bcrypt";

const saltNumber = process.env.SALT ? parseInt(process.env.SALT) : 10;
const salts = bcrypt.genSaltSync(saltNumber);

const hashpassword = async (password: string) => {
	try {
		const hash = await bcrypt.hash(password, salts);
		return hash;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

const validateHash = async (hash: string, compare: string) => {
	try {
		const valid = bcrypt.compare(compare, hash);
		return valid;
	} catch (error) {
		throw new Error(`${error}`);
	}
};

export { hashpassword, validateHash };
