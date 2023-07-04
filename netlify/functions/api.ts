import app from "../../src/app";
import ServerlessHttp from "serverless-http";

export const handler = ServerlessHttp(app);
