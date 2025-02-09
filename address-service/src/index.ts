import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Timeout, forcefully shutting down");
    process.exit(1);
  }, 10000);
  process.exit(0);
}

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
