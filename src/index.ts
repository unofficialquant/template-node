import { createServer } from "http";
import winston from "winston";

// Create a logger instance
const logger = winston.createLogger({
  defaultMeta: { entrypoint: "index.js" },
  format: winston.format.json(),
  level: "info",
  transports: [
    new winston.transports.File({ filename: "logs/all.log" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// If not in production, also log to console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const hostname = "127.0.0.1";
const port = 3000;

/**
 * The HTTP server instance.
 */
export const app = createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

/**
 * Starts the HTTP server.
 */
app.listen(port, hostname, () => {
  logger.info(`Server running at http://${hostname}:${port}/`);
});
