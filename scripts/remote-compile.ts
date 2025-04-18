import fs from "node:fs";

// const code = fs.readFileSync("./src/index.ts", "utf-8");
const code = `
import { Hono } from "hono";

const app = new Hono();

export default app;
`;

compile(code)
  .then((a) => {
    console.log("success!!!");
    console.log(a);
  })
  .catch((e) => {
    console.log("error!!!");
    console.error(e);
  });

async function compile(code: string) {
  const response = await fetch("http://localhost:8437/compile", {
    method: "POST",
    body: code,
  });

  return response.text();
}

