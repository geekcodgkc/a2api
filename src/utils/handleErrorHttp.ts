import { Response } from "express";

const handleErrorHttp = (res: Response, error: string, rawError?: unknown) => {
	if (rawError) console.log(rawError);
	res.status(500);
	res.json({ error, rawError });
};

export { handleErrorHttp };
