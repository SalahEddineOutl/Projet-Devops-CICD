const request = require("supertest");
const fs = require("fs");
const path = require("path");

describe("integration: API <-> DB", () => {
  const tmpDb = path.join(__dirname, "test.sqlite");

  beforeAll(() => {
    process.env.DB_FILE = tmpDb;
    process.env.APP_ENV = "test";
    process.env.APP_NAME = "tp-test";
    jest.resetModules(); // important: recharge app.js avec les variables ci-dessus
  });

  afterAll(() => {
    try { fs.unlinkSync(tmpDb); } catch (_) {}
  });

  test("GET /api/health returns ok", async () => {
    const app = require("../app");
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.env).toBe("test");
    expect(res.body.appName).toBe("tp-test");
  });

  test("POST then GET messages", async () => {
    const app = require("../app");

    const post = await request(app)
      .post("/api/messages")
      .send({ content: "Integration message" })
      .set("Content-Type", "application/json");

    expect(post.status).toBe(201);
    expect(typeof post.body.id).toBe("number");

    const get = await request(app).get("/api/messages");
    expect(get.status).toBe(200);

    const contents = get.body.messages.map(m => m.content);
    expect(contents).toContain("Integration message");
  });
});
