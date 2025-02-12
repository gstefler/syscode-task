import { prisma } from "./prisma";
import logger from "./config/logger";
import app from "./app";

logger.info("Starting address service... Environment:", process.env.NODE_ENV);

const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

async function prismaCleanup() {
  try {
    await prisma.$disconnect();
    logger.info("Prisma connection has been closed");
  } catch (e) {
    logger.error(e);
  }
}

function shutDown() {
  logger.info("Received kill signal, shutting down gracefully...");
  server.close(async () => {
    await prismaCleanup();
    process.exit(0);
  });

  setTimeout(async () => {
    logger.error(
      "Could not close connections in time, forcefully shutting down"
    );
    await prismaCleanup();
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
