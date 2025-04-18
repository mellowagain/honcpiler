import { createFiberplane, createOpenAPISpec } from "@fiberplane/hono";
import { Hono } from "hono";
import { compileTypescript } from "./typescript-compile";
import foo from "./meow.ts?raw";

const app = new Hono();

app.get("/", (c) => {
  return c.text(foo);
});

app.post("/compile", async (c) => {
  let body = await c.req.text();

  if (body.length === 0) {
    body = foo;
  }

  const a = await compileTypescript(body);

  return c.text(a);
});

/**
 * Serve a simplified api specification for your API
 * As of writing, this is just the list of routes and their methods.
 */
app.get("/openapi.json", c => {
  return c.json(createOpenAPISpec(app, {
    info: {
      title: "Honc D1 App",
      version: "1.0.0",
    },
  }))
});

/**
 * Mount the Fiberplane api explorer to be able to make requests against your API.
 * 
 * Visit the explorer at `/fp`
 */
app.use("/fp/*", createFiberplane({
  app,
  openapi: { url: "/openapi.json" }
}));


export default app;
