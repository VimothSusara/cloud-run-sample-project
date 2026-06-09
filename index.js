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

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
