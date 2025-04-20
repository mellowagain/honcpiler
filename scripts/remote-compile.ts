import fs from "node:fs";

// const code = fs.readFileSync("./src/index.ts", "utf-8");
const code = `
import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";

type Bindings = { DB: D1Database };

const app = new Hono<{ Bindings: Bindings }>();

app.use(async (c, next) => {
  const db = drizzle(c.env.DB);
  c.set("db", db);
  await next();
});

export default app;
`;

// Additional npm packages to include type definitions for

compile(code)
  .then((a) => {
    console.log(JSON.stringify(a, null, 2));
  })
  .catch((e) => {
    console.log("error!!!");
    console.error(e);
  });

async function compile(code: string) {
  const response = await fetch("http://localhost:8437/compile?debug=true", {
    method: "POST",
    body: code,
  });

  return response.json();
}

