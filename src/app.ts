import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import dbConnect from "./config/mongo";
import morgan from "morgan";
import cron from "node-cron";

//funciones especiales
import ResetAllClientsKg from "./utils/kgReset";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(cookieParser());
app.use(express.static("public"));

dbConnect()
	.then(() => console.log("db connected"))
	.catch((e) => console.log(e));

const job = cron.schedule(
	"* * * * *",
	async () => {
		console.log("running");
		ResetAllClientsKg();
	},
	{
		scheduled: true,
		recoverMissedExecutions: true,
	},
);

job.start();

app.listen(PORT, () => {
	console.log(`app running on port: ${PORT}`);
});

export default app;
