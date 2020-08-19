import { Server } from "./server";
import { SeverityLevel } from "./utils/logger/severityLevel";
import { log } from "./utils/logger/logger";
import { connectToMongo } from "./utils/dbConnector";

process.on("uncaughtException", (err: Error) => {
  console.error("Unhandled Exception", err.stack);
  log(SeverityLevel.ERROR, "Unhandled Exception", err.stack || "Unhandled Exception");
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
  log(SeverityLevel.ERROR, "Unhandled Rejection", "Unhandled Rejection");
  process.exit(1);
});

(async () => {
  await connectToMongo();
  const server: Server = Server.bootstrap();
  server.listen();

  server.app.on("close", () => {
    log(SeverityLevel.INFO, `Server closed`, "Server");
  });
})();
