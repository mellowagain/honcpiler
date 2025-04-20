import ts from "typescript"
import { createSystem, createVirtualCompilerHost } from "@typescript/vfs";
import { createFsMap } from "./vfs";

export type ErrorInfo = {
  message: string;
  severity: "error" | "warning";
  location?: string;
};

export async function compileTypescript(fileContents: string, additionalPackages: string[] = [], debug = false): Promise<ErrorInfo[]> {
  const fsMap = await createFsMap(additionalPackages, debug);

  fsMap.set("index.ts", fileContents);

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ["ESNext"],
    strict: true,
    types: ["@cloudflare/workers-types"],
    skipLibCheck: true,
    noEmit: true,
    // For debugging: Enable module resolution tracing
    // This is useful to see how TypeScript resolves modules,
    // in case you can't figure out why it's not picking up type definitions for a dependency
    traceResolution: debug 
  };

  if (debug) {
    console.log("[debug] Compiler options:", JSON.stringify(compilerOptions, null, 2));
    console.log("[debug] Virtual filesystem has", fsMap.size, "files");
    
    // Log files in the virtual filesystem that might be relevant to Hono
    console.log("[debug] Files in virtual filesystem related to Hono:");
    const honoFiles = [...fsMap.keys()].filter(path => path.includes("hono"));
    for (const file of honoFiles) {
      console.log(`   - ${file}`);
    }
  }

  const system = createSystem(fsMap);
  
  // Override fileExists to trace file lookup
  const origFileExists = system.fileExists;
  system.fileExists = (path: string): boolean => {
    if (debug && path.includes("hono")) {
      console.log(`Checking if file exists: ${path} => ${origFileExists.call(system, path)}`);
    }
    return origFileExists.call(system, path);
  };
  
  // Override readFile to trace file reading
  const origReadFile = system.readFile;
  system.readFile = (path: string): string | undefined => {
    if (debug && path.includes("hono")) {
      console.log(`Reading file: ${path}`);
    }
    return origReadFile.call(system, path);
  };
  
  const host = createVirtualCompilerHost(system, compilerOptions, ts);
  
  // Create a custom module resolution host to trace resolutions
  if (debug && host.compilerHost.resolveModuleNames) {
    const origResolveModuleNames = host.compilerHost.resolveModuleNames;
    host.compilerHost.resolveModuleNames = function(moduleNames, containingFile, ...rest) {
      console.log(`Resolving modules from ${containingFile}:`, moduleNames);
      const result = origResolveModuleNames.apply(this, [moduleNames, containingFile, ...rest]);
      console.log("Resolution result:", result);
      return result;
    };
  }

  const program = ts.createProgram({
    rootNames: [...fsMap.keys()].filter(name => name.endsWith('.ts')),
    options: compilerOptions,
    host: host.compilerHost,
  });

  const emitResult = program.emit();
  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  
  const errors: ErrorInfo[] = [];

  // biome-ignore lint/complexity/noForEach: processing diagnostics
  allDiagnostics.forEach(diagnostic => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    const severity = diagnostic.category === ts.DiagnosticCategory.Error ? "error" : "warning";
    const code = diagnostic.code;
    
    const errorInfo: ErrorInfo = {
      message: `TS${code}: ${message}`,
      severity,
    };
    
    if (diagnostic.file && diagnostic.start !== undefined) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      errorInfo.location = `${diagnostic.file.fileName}:${line + 1}:${character + 1}`;
    }
    
    errors.push(errorInfo);
  });

  if (debug) {
    console.log(`Found ${errors.length} diagnostic messages`);
  }

  return errors;
}