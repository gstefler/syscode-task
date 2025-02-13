import express, { json, urlencoded } from "express";
import expressWinston from "express-winston";
import { RegisterRoutes } from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import logger from "./config/logger";
import cors from "cors";

const app = express();

app.use(
  urlencoded({
    extended: true,
  })
);
app.use(json());
app.use(cors());

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
  })
);

app.get("/up", (_req, res) => {
  res.status(200).send({ status: "up" });
});

RegisterRoutes(app);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
