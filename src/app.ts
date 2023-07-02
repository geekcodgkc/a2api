import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import dbConnect from "./config/mongo";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(cookieParser());

dbConnect()
	.then(() => console.log("db connected"))
	.catch((e) => console.log(e));

app.listen(PORT, () => {
	console.log(`app running on port: ${PORT}`);
});
