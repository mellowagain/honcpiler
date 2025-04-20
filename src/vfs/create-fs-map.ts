import { downloadTypeDefinitions } from "../download-type-definitions";
import { addCloudflareWorkersTypes } from "./add-cloudflare-workers-types";
import { addDrizzleTypes } from "./add-drizzle-types";
import { addHonoTypes } from "./add-hono-types";
import { addTypescriptLibs } from "./add-typescript-libs";

/**
 * Create a virutal fsMap with the typescript lib definitions and the Cloudflare Workers types
 * @param additionalPackages Optional array of additional npm packages to include type definitions for
 * @param debug Whether to output debug information
 */
export async function createFsMap(additionalPackages: string[] = [], debug = false) {
  //const fsMap = await createDefaultMapFromCDN({ target: ts.ScriptTarget.ES2024 }, ts.version, false, ts);
  const fsMap = new Map<string, string>();

  addTypescriptLibs(fsMap);
  addHonoTypes(fsMap);
  addCloudflareWorkersTypes(fsMap);
  addDrizzleTypes(fsMap);

  // Download additional package types
  for (const packageName of additionalPackages) {
    throw new Error("Not implemented");
    if (debug) {
      console.log(`Downloading type definitions for ${packageName}`);
    }
    const packageTypes = await downloadTypeDefinitions(packageName, debug);
    for (const [path, content] of packageTypes) {
      fsMap.set(path, content);
    }
    if (debug) {
      console.log(`Added ${packageTypes.size} files for ${packageName}`);
    }
  }

  return fsMap;
}


