import fs from "node:fs";

// const code = fs.readFileSync("./src/index.ts", "utf-8");
const code = `
import { Hono } from "hono";

const app = new Hono();

export default app;
`;

// Additional npm packages to include type definitions for
const additionalPackages = ["hono"];

compile(code, additionalPackages)
  .then((a) => {
    console.log(JSON.stringify(a, null, 2));
  })
  .catch((e) => {
    console.log("error!!!");
    console.error(e);
  });

async function compile(code: string, packages: string[] = []) {
  const response = await fetch("http://localhost:8437/compile?debug=true", {
    method: "POST",
    headers: {
      "x-additional-packages": JSON.stringify(packages)
    },
    body: code,
  });

  return response.json();
}

