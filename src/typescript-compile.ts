import ts from "typescript"
import { createFsMap } from "./fs-map";
import { createVirtualCompilerHost } from "@typescript/vfs";
import { createSystem } from "@typescript/vfs";

export async function compileTypescript(fileContents: string) {
  const fsMap = await createFsMap();

  fsMap.set("index.ts", fileContents);

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

  let a = "";

  // biome-ignore lint/complexity/noForEach: debugging
  allDiagnostics.forEach(diagnostic => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    if (diagnostic.file) {
      // biome-ignore lint/style/noNonNullAssertion: debugging
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      a += `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}\n`;
    } else {
      a += `${message}\n`;
    }
  });

  return a;
}