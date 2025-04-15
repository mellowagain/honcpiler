import { instrument } from "@fiberplane/hono-otel";
import { createFiberplane, createOpenAPISpec } from "@fiberplane/hono";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import * as schema from "./db/schema";
import {createDefaultMapFromCDN, createVirtualCompilerHost, createSystem} from "@typescript/vfs";
import ts from "typescript"

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Honc from above! ☁️🪿");
});

app.post("/compile", async (c) => {
  const fsMap = await createDefaultMapFromCDN({ target: ts.ScriptTarget.ESNext }, "3.7.3", false, ts);

  // Download Cloudflare Workers types
  const workerTypes = await downloadTypeDefinitions("@cloudflare/workers-types");
  for (const [path, content] of Object.entries(workerTypes)) {
    fsMap.set(path, content);
  }

  fsMap.set("index.ts", `function meow(): string {
      console.log("meow");
      return 0;
    }
  
    meow();`);

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ["ESNext"/*, "webworker"*/],
    strict: true,
    types: ["@cloudflare/workers-types"],  // Include Cloudflare Workers types
    skipLibCheck: true,
    noEmit: true
  };

  const system = createSystem(fsMap);
  const host = createVirtualCompilerHost(system, compilerOptions, ts);

  const program = ts.createProgram({
    rootNames: [...fsMap.keys()],
    options: compilerOptions,
    host: host.compilerHost,
  });

  const emitResult = program.emit();

  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.error(message);
    }
  });


  return c.text("ok");
});

async function downloadPackage(packageName: string) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  if (!response.ok) {
    throw new Error(`Failed to download package ${packageName}`);
  }

  return await response.json();
}

async function downloadTypeDefinitions(packageName: string) {
  const packageInfo = await downloadPackage(packageName);
  const latestVersion = packageInfo["dist-tags"].latest;
  const baseUrl = `https://unpkg.com/${packageName}@${latestVersion}`;

  // First get the package.json to find the types entry point
  const packageJsonResponse = await fetch(`${baseUrl}/package.json`);
  const packageJson = await packageJsonResponse.json();

  const typesEntry = packageJson.types || packageJson.typings || "index.d.ts";
  const typeFiles = new Map<string, string>();

  // Download the main type definition file
  const mainTypeResponse = await fetch(`${baseUrl}/${typesEntry}`);
  if (!mainTypeResponse.ok) {
    throw new Error(`Failed to download type definitions for ${packageName}`);
  }

  const mainTypeContent = await mainTypeResponse.text();
  typeFiles.set(`node_modules/${packageName}/${typesEntry}`, mainTypeContent);

  // TODO: Recursively handle imports in the type definitions if needed
  // This would require parsing the .d.ts files and fetching referenced files

  return typeFiles;
}

/**
 * Serve a simplified api specification for your API
 * As of writing, this is just the list of routes and their methods.
 */
app.get("/openapi.json", c => {
  // @ts-expect-error - @fiberplane/hono is in beta and still not typed correctly
  return c.json(createOpenAPISpec(app, {
    openapi: "3.0.0",
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

// Export the instrumented app if you've wired up a Fiberplane-Hono-OpenTelemetry trace collector
//
// export default instrument(app);
