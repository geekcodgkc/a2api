import Jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.SECRET;

const jwtConfig = {};

const sign = async (data: unknown) => {};

const verify = async (data: unknown) => {};

export { verify, sign };
