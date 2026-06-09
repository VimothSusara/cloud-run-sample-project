const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Hello from Cloud Run!",
    service: "cloud-run-sample-project",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/hello", (req, res) => {
  const name = req.query.name || "World";
  res.json({ greeting: `Hello, ${name}!` });
});

app.post("/api/echo", (req, res) => {
  res.json({
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/message", (req, res) => {
  const { name, message } = req.body ?? {};

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Both 'name' and 'message' fields are required.",
      },
      timestamp: new Date().toISOString(),
    });
  }

  res.status(200).json({
    success: true,
    data: {
      id: crypto.randomUUID(),
      greeting: `Hi ${name}, we received your message.`,
      originalMessage: message,
      receivedAt: new Date().toISOString(),
    },
    meta: {
      service: "cloud-run-sample-project",
      version: "1.0.0",
    },
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
