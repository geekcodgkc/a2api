import { Response } from "express";

const handleErrorHttp = (res: Response, error: string, errorRaw?: unknown) => {
	if (errorRaw) console.log(errorRaw);
	res.status(500);
	res.json({ error });
};

export { handleErrorHttp };
