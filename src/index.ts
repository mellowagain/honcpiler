import { createFiberplane, createOpenAPISpec } from "@fiberplane/hono";
import { Hono } from "hono";
import {createDefaultMapFromCDN, createVirtualCompilerHost, createSystem} from "@typescript/vfs";
import ts from "typescript"
import foo from "./src/meow.ts?raw";

// ts imports

import foo from "./src/meow.ts?raw"
// Core library definitions
import libDts from "./out/lib.d.ts?raw";
import decoratorsDts from "./out/lib.decorators.d.ts?raw";
import decoratorsLegacyDts from "./out/lib.decorators.legacy.d.ts?raw";
import scriptHostDts from "./out/lib.scripthost.d.ts?raw";

// DOM-related definitions
import domDts from "./out/lib.dom.d.ts?raw";
import domIterableDts from "./out/lib.dom.iterable.d.ts?raw";
import domAsyncIterableDts from "./out/lib.dom.asynciterable.d.ts?raw";

// ES5/ES6 definitions
import es5Dts from "./out/lib.es5.d.ts?raw";
import es6Dts from "./out/lib.es6.d.ts?raw";

// ES2015 definitions
import es2015CollectionDts from "./out/lib.es2015.collection.d.ts?raw";
import es2015CoreDts from "./out/lib.es2015.core.d.ts?raw";
import es2015Dts from "./out/lib.es2015.d.ts?raw";
import es2015GeneratorDts from "./out/lib.es2015.generator.d.ts?raw";
import es2015IterableDts from "./out/lib.es2015.iterable.d.ts?raw";
import es2015PromiseDts from "./out/lib.es2015.promise.d.ts?raw";
import es2015ProxyDts from "./out/lib.es2015.proxy.d.ts?raw";
import es2015ReflectDts from "./out/lib.es2015.reflect.d.ts?raw";
import es2015SymbolDts from "./out/lib.es2015.symbol.d.ts?raw";
import es2015SymbolWellknownDts from "./out/lib.es2015.symbol.wellknown.d.ts?raw";

// ES2016 definitions
import es2016ArrayIncludeDts from "./out/lib.es2016.array.include.d.ts?raw";
import es2016Dts from "./out/lib.es2016.d.ts?raw";
import es2016FullDts from "./out/lib.es2016.full.d.ts?raw";
import es2016IntlDts from "./out/lib.es2016.intl.d.ts?raw";

// ES2017 definitions
import es2017ArraybufferDts from "./out/lib.es2017.arraybuffer.d.ts?raw";
import es2017Dts from "./out/lib.es2017.d.ts?raw";
import es2017DateDts from "./out/lib.es2017.date.d.ts?raw";
import es2017FullDts from "./out/lib.es2017.full.d.ts?raw";
import es2017IntlDts from "./out/lib.es2017.intl.d.ts?raw";
import es2017ObjectDts from "./out/lib.es2017.object.d.ts?raw";
import es2017SharedmemoryDts from "./out/lib.es2017.sharedmemory.d.ts?raw";
import es2017StringDts from "./out/lib.es2017.string.d.ts?raw";
import es2017TypedarraysDts from "./out/lib.es2017.typedarrays.d.ts?raw";

// ES2018 definitions
import es2018AsyncgeneratorDts from "./out/lib.es2018.asyncgenerator.d.ts?raw";
import es2018AsynciterableDts from "./out/lib.es2018.asynciterable.d.ts?raw";
import es2018Dts from "./out/lib.es2018.d.ts?raw";
import es2018FullDts from "./out/lib.es2018.full.d.ts?raw";
import es2018IntlDts from "./out/lib.es2018.intl.d.ts?raw";
import es2018PromiseDts from "./out/lib.es2018.promise.d.ts?raw";
import es2018RegexpDts from "./out/lib.es2018.regexp.d.ts?raw";

// ES2019 definitions
import es2019ArrayDts from "./out/lib.es2019.array.d.ts?raw";
import es2019Dts from "./out/lib.es2019.d.ts?raw";
import es2019FullDts from "./out/lib.es2019.full.d.ts?raw";
import es2019IntlDts from "./out/lib.es2019.intl.d.ts?raw";
import es2019ObjectDts from "./out/lib.es2019.object.d.ts?raw";
import es2019StringDts from "./out/lib.es2019.string.d.ts?raw";
import es2019SymbolDts from "./out/lib.es2019.symbol.d.ts?raw";

// ES2020 definitions
import es2020BigintDts from "./out/lib.es2020.bigint.d.ts?raw";
import es2020Dts from "./out/lib.es2020.d.ts?raw";
import es2020DateDts from "./out/lib.es2020.date.d.ts?raw";
import es2020FullDts from "./out/lib.es2020.full.d.ts?raw";
import es2020IntlDts from "./out/lib.es2020.intl.d.ts?raw";
import es2020NumberDts from "./out/lib.es2020.number.d.ts?raw";
import es2020PromiseDts from "./out/lib.es2020.promise.d.ts?raw";
import es2020SharedmemoryDts from "./out/lib.es2020.sharedmemory.d.ts?raw";
import es2020StringDts from "./out/lib.es2020.string.d.ts?raw";
import es2020SymbolWellknownDts from "./out/lib.es2020.symbol.wellknown.d.ts?raw";

// ES2021 definitions
import es2021Dts from "./out/lib.es2021.d.ts?raw";
import es2021FullDts from "./out/lib.es2021.full.d.ts?raw";
import es2021IntlDts from "./out/lib.es2021.intl.d.ts?raw";
import es2021PromiseDts from "./out/lib.es2021.promise.d.ts?raw";
import es2021StringDts from "./out/lib.es2021.string.d.ts?raw";
import es2021WeakrefDts from "./out/lib.es2021.weakref.d.ts?raw";

// ES2022 definitions
import es2022ArrayDts from "./out/lib.es2022.array.d.ts?raw";
import es2022Dts from "./out/lib.es2022.d.ts?raw";
import es2022ErrorDts from "./out/lib.es2022.error.d.ts?raw";
import es2022FullDts from "./out/lib.es2022.full.d.ts?raw";
import es2022IntlDts from "./out/lib.es2022.intl.d.ts?raw";
import es2022ObjectDts from "./out/lib.es2022.object.d.ts?raw";
import es2022RegexpDts from "./out/lib.es2022.regexp.d.ts?raw";
import es2022StringDts from "./out/lib.es2022.string.d.ts?raw";

// ES2023 definitions
import es2023ArrayDts from "./out/lib.es2023.array.d.ts?raw";
import es2023CollectionDts from "./out/lib.es2023.collection.d.ts?raw";
import es2023Dts from "./out/lib.es2023.d.ts?raw";
import es2023FullDts from "./out/lib.es2023.full.d.ts?raw";
import es2023IntlDts from "./out/lib.es2023.intl.d.ts?raw";

// ES2024 definitions
import es2024ArraybufferDts from "./out/lib.es2024.arraybuffer.d.ts?raw";
import es2024CollectionDts from "./out/lib.es2024.collection.d.ts?raw";
import es2024Dts from "./out/lib.es2024.d.ts?raw";
import es2024FullDts from "./out/lib.es2024.full.d.ts?raw";
import es2024ObjectDts from "./out/lib.es2024.object.d.ts?raw";
import es2024PromiseDts from "./out/lib.es2024.promise.d.ts?raw";
import es2024RegexpDts from "./out/lib.es2024.regexp.d.ts?raw";
import es2024SharedmemoryDts from "./out/lib.es2024.sharedmemory.d.ts?raw";
import es2024StringDts from "./out/lib.es2024.string.d.ts?raw";

// ESNext definitions
import esNextArrayDts from "./out/lib.esnext.array.d.ts?raw";
import esNextCollectionDts from "./out/lib.esnext.collection.d.ts?raw";
import esNextDts from "./out/lib.esnext.d.ts?raw";
import esNextDecoratorsDts from "./out/lib.esnext.decorators.d.ts?raw";
import esNextDisposableDts from "./out/lib.esnext.disposable.d.ts?raw";
import esNextFloat16Dts from "./out/lib.esnext.float16.d.ts?raw";
import esNextFullDts from "./out/lib.esnext.full.d.ts?raw";
import esNextIntlDts from "./out/lib.esnext.intl.d.ts?raw";
import esNextIteratorDts from "./out/lib.esnext.iterator.d.ts?raw";
import esNextPromiseDts from "./out/lib.esnext.promise.d.ts?raw";

// Web worker related definitions
import webWorkerDts from "./out/lib.webworker.d.ts?raw";
import webWorkerAsyncIterableDts from "./out/lib.webworker.asynciterable.d.ts?raw";
import webWorkerImportScriptsDts from "./out/lib.webworker.importscripts.d.ts?raw";
import webWorkerIterableDts from "./out/lib.webworker.iterable.d.ts?raw";

const app = new Hono();

app.get("/", (c) => {
  return c.text(foo);
});

app.post("/compile", async (c) => {
  let body = await c.req.text();

  if (body.length === 0) {
    body = foo;
  }

  //const fsMap = await createDefaultMapFromCDN({ target: ts.ScriptTarget.ES2024 }, ts.version, false, ts);
  const fsMap = new Map<string, string>();

// Core library definitions
//fsMap.set("/lib.d.ts", libDts);
fsMap.set("/lib.decorators.d.ts", decoratorsDts);
fsMap.set("/lib.decorators.legacy.d.ts", decoratorsLegacyDts);
fsMap.set("/lib.scripthost.d.ts", scriptHostDts);

// DOM-related definitions
fsMap.set("/lib.dom.d.ts", domDts);
//fsMap.set("/lib.dom.iterable.d.ts", domIterableDts);
//fsMap.set("/lib.dom.asynciterable.d.ts", domAsyncIterableDts);

// ES5/ES6 definitions
fsMap.set("/lib.es5.d.ts", es5Dts);
//fsMap.set("/lib.es6.d.ts", es6Dts);

// ES2015 definitions
fsMap.set("/lib.es2015.collection.d.ts", es2015CollectionDts);
fsMap.set("/lib.es2015.core.d.ts", es2015CoreDts);
fsMap.set("/lib.es2015.d.ts", es2015Dts);
fsMap.set("/lib.es2015.generator.d.ts", es2015GeneratorDts);
fsMap.set("/lib.es2015.iterable.d.ts", es2015IterableDts);
fsMap.set("/lib.es2015.promise.d.ts", es2015PromiseDts);
fsMap.set("/lib.es2015.proxy.d.ts", es2015ProxyDts);
fsMap.set("/lib.es2015.reflect.d.ts", es2015ReflectDts);
fsMap.set("/lib.es2015.symbol.d.ts", es2015SymbolDts);
fsMap.set("/lib.es2015.symbol.wellknown.d.ts", es2015SymbolWellknownDts);

// ES2016 definitions
//fsMap.set("/lib.es2016.array.include.d.ts", es2016ArrayIncludeDts);
//fsMap.set("/lib.es2016.d.ts", es2016Dts);
//fsMap.set("/lib.es2016.full.d.ts", es2016FullDts);
fsMap.set("/lib.es2016.intl.d.ts", es2016IntlDts);

// ES2017 definitions
//fsMap.set("/lib.es2017.arraybuffer.d.ts", es2017ArraybufferDts);
//fsMap.set("/lib.es2017.d.ts", es2017Dts);
fsMap.set("/lib.es2017.date.d.ts", es2017DateDts);
//fsMap.set("/lib.es2017.full.d.ts", es2017FullDts);
fsMap.set("/lib.es2017.intl.d.ts", es2017IntlDts);
fsMap.set("/lib.es2017.object.d.ts", es2017ObjectDts);
fsMap.set("/lib.es2017.sharedmemory.d.ts", es2017SharedmemoryDts);
fsMap.set("/lib.es2017.string.d.ts", es2017StringDts);
fsMap.set("/lib.es2017.typedarrays.d.ts", es2017TypedarraysDts);

// ES2018 definitions
//fsMap.set("/lib.es2018.asyncgenerator.d.ts", es2018AsyncgeneratorDts);
fsMap.set("/lib.es2018.asynciterable.d.ts", es2018AsynciterableDts);
//fsMap.set("/lib.es2018.d.ts", es2018Dts);
//fsMap.set("/lib.es2018.full.d.ts", es2018FullDts);
fsMap.set("/lib.es2018.intl.d.ts", es2018IntlDts);
fsMap.set("/lib.es2018.promise.d.ts", es2018PromiseDts);
fsMap.set("/lib.es2018.regexp.d.ts", es2018RegexpDts);

// ES2019 definitions
//fsMap.set("/lib.es2019.array.d.ts", es2019ArrayDts);
//fsMap.set("/lib.es2019.d.ts", es2019Dts);
//fsMap.set("/lib.es2019.full.d.ts", es2019FullDts);
fsMap.set("/lib.es2019.intl.d.ts", es2019IntlDts);
fsMap.set("/lib.es2019.object.d.ts", es2019ObjectDts);
fsMap.set("/lib.es2019.string.d.ts", es2019StringDts);
fsMap.set("/lib.es2019.symbol.d.ts", es2019SymbolDts);

// ES2020 definitions
fsMap.set("/lib.es2020.bigint.d.ts", es2020BigintDts);
//fsMap.set("/lib.es2020.d.ts", es2020Dts);
fsMap.set("/lib.es2020.date.d.ts", es2020DateDts);
//fsMap.set("/lib.es2020.full.d.ts", es2020FullDts);
fsMap.set("/lib.es2020.intl.d.ts", es2020IntlDts);
fsMap.set("/lib.es2020.number.d.ts", es2020NumberDts);
fsMap.set("/lib.es2020.promise.d.ts", es2020PromiseDts);
fsMap.set("/lib.es2020.sharedmemory.d.ts", es2020SharedmemoryDts);
fsMap.set("/lib.es2020.string.d.ts", es2020StringDts);
fsMap.set("/lib.es2020.symbol.wellknown.d.ts", es2020SymbolWellknownDts);

// ES2021 definitions
//fsMap.set("/lib.es2021.d.ts", es2021Dts);
//fsMap.set("/lib.es2021.full.d.ts", es2021FullDts);
fsMap.set("/lib.es2021.intl.d.ts", es2021IntlDts);
fsMap.set("/lib.es2021.promise.d.ts", es2021PromiseDts);
fsMap.set("/lib.es2021.string.d.ts", es2021StringDts);
fsMap.set("/lib.es2021.weakref.d.ts", es2021WeakrefDts);

// ES2022 definitions
//fsMap.set("/lib.es2022.array.d.ts", es2022ArrayDts);
//fsMap.set("/lib.es2022.d.ts", es2022Dts);
fsMap.set("/lib.es2022.error.d.ts", es2022ErrorDts);
//fsMap.set("/lib.es2022.full.d.ts", es2022FullDts);
fsMap.set("/lib.es2022.intl.d.ts", es2022IntlDts);
fsMap.set("/lib.es2022.object.d.ts", es2022ObjectDts);
fsMap.set("/lib.es2022.regexp.d.ts", es2022RegexpDts);
fsMap.set("/lib.es2022.string.d.ts", es2022StringDts);

// ES2023 definitions
//fsMap.set("/lib.es2023.array.d.ts", es2023ArrayDts);
//fsMap.set("/lib.es2023.collection.d.ts", es2023CollectionDts);
//fsMap.set("/lib.es2023.d.ts", es2023Dts);
//fsMap.set("/lib.es2023.full.d.ts", es2023FullDts);
fsMap.set("/lib.es2023.intl.d.ts", es2023IntlDts);

// ES2024 definitions
//fsMap.set("/lib.es2024.arraybuffer.d.ts", es2024ArraybufferDts);
//fsMap.set("/lib.es2024.collection.d.ts", es2024CollectionDts);
//fsMap.set("/lib.es2024.d.ts", es2024Dts);
//fsMap.set("/lib.es2024.full.d.ts", es2024FullDts);
fsMap.set("/lib.es2024.object.d.ts", es2024ObjectDts);
fsMap.set("/lib.es2024.promise.d.ts", es2024PromiseDts);
fsMap.set("/lib.es2024.regexp.d.ts", es2024RegexpDts);
fsMap.set("/lib.es2024.sharedmemory.d.ts", es2024SharedmemoryDts);
fsMap.set("/lib.es2024.string.d.ts", es2024StringDts);

// ESNext definitions
//fsMap.set("/lib.esnext.array.d.ts", esNextArrayDts);
//fsMap.set("/lib.esnext.collection.d.ts", esNextCollectionDts);
//fsMap.set("/lib.esnext.d.ts", esNextDts);
fsMap.set("/lib.esnext.decorators.d.ts", esNextDecoratorsDts);
fsMap.set("/lib.esnext.disposable.d.ts", esNextDisposableDts);
fsMap.set("/lib.esnext.float16.d.ts", esNextFloat16Dts);
//fsMap.set("/lib.esnext.full.d.ts", esNextFullDts);
fsMap.set("/lib.esnext.intl.d.ts", esNextIntlDts);
fsMap.set("/lib.esnext.iterator.d.ts", esNextIteratorDts);
fsMap.set("/lib.esnext.promise.d.ts", esNextPromiseDts);

// Web worker related definitions
//fsMap.set("/lib.webworker.d.ts", webWorkerDts);
//fsMap.set("/lib.webworker.asynciterable.d.ts", webWorkerAsyncIterableDts);
fsMap.set("/lib.webworker.importscripts.d.ts", webWorkerImportScriptsDts);
//fsMap.set("/lib.webworker.iterable.d.ts", webWorkerIterableDts);

  // Download Cloudflare Workers types
  const workerTypes = await downloadTypeDefinitions("@cloudflare/workers-types");
  for (const [path, content] of workerTypes) {
    fsMap.set(path, content);
  }

  fsMap.set("index.ts", body);

  //console.log(fsMap.keys());

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    //lib: ["ESNext"/*, "webworker"*/],
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

  let a = "";

  allDiagnostics.forEach(diagnostic => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      a += `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}\n`;
    } else {
      a += message + "\n";
    }
  });


  return c.text(a);
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
  typeFiles.set(`/node_modules/${packageName}/${typesEntry}`, mainTypeContent);

  //console.log(typeFiles);

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
