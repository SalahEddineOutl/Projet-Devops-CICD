const Database = require("better-sqlite3");

function initDb(dbFile) {
  const db = new Database(dbFile);

  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // seed si vide
  const count = db.prepare("SELECT COUNT(*) AS c FROM messages").get().c;
  if (count === 0) {
    const insert = db.prepare("INSERT INTO messages (content, created_at) VALUES (?, ?)");
    const now = new Date().toISOString();
    insert.run("Hello from DB 👋", now);
    insert.run("CI/CD is working ✅", now);
  }

  return db;
}

function listMessages(db) {
  return db
    .prepare("SELECT id, content, created_at FROM messages ORDER BY id DESC LIMIT 50")
    .all();
}

function addMessage(db, content) {
  const stmt = db.prepare("INSERT INTO messages (content, created_at) VALUES (?, ?)");
  const info = stmt.run(content, new Date().toISOString());
  return info.lastInsertRowid;
}

module.exports = { initDb, listMessages, addMessage };
