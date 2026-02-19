const express = require("express");
const path = require("path");
const { initDb, listMessages, addMessage } = require("./db");

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const APP_ENV = process.env.APP_ENV || "dev"; // variable non sensible
const APP_NAME = process.env.APP_NAME || "tp-devops-app"; // variable non sensible
// Secret: ne JAMAIS logger DB_PASSWORD
const DB_PASSWORD = process.env.DB_PASSWORD || ""; // secret (utilisé juste pour démo)
void DB_PASSWORD;

const DB_FILE = process.env.DB_FILE || "./data.sqlite";

const db = initDb(DB_FILE);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    env: APP_ENV,
    appName: APP_NAME
  });
});

app.get("/api/messages", (req, res) => {
  const messages = listMessages(db);
  res.json({ env: APP_ENV, messages });
});

app.post("/api/messages", (req, res) => {
  const content = (req.body && req.body.content ? String(req.body.content) : "").trim();
  if (!content) {
    return res.status(400).json({ error: "content is required" });
  }
  const id = addMessage(db, content);
  res.status(201).json({ id });
});

if (require.main === module) {
  // Ici on démontre que la variable non sensible peut apparaître dans les logs
  // MAIS on ne log jamais DB_PASSWORD
  console.log(`[START] app=${APP_NAME} env=${APP_ENV} port=${PORT}`);
  app.listen(PORT, () => console.log(`[READY] http://localhost:${PORT}`));
}

module.exports = app;
