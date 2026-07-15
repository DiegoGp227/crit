import express from "express";
import cors from "cors";
import { router } from "../routes/index.routes";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import { logger } from "../utils/logger";
import { env } from "../config/env";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((o) => o.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api", router);
// RM: remove or replace
app.get("/ping", (req, res) => res.send("pong"));
app.use((req, res) => {
  res.status(404).json({
    message: "RM: Not Found", // RM: replace with your own message
  });
});
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT}`);
});
