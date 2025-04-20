import honoTypes from "../package-types/hono-types";

/**
 * Add the Hono type definitions to the fsMap
 * @NOTE - Mutates the fsMap input
 */
export function addHonoTypes(fsMap: Map<string, string>) {
  // Add all the Hono type definition files
  for (const typeDef of honoTypes) {
    fsMap.set(typeDef.path, typeDef.content);
  }

  // // NOT IN USE - Add package.json for Hono to help TypeScript locate the types
  // const honoPackageJson = JSON.stringify({
  //   name: "hono",
  //   version: "4.4.0",
  //   types: "dist/types/index.d.ts",
  //   main: "dist/index.js",
  //   module: "dist/index.mjs",
  //   exports: {
  //     ".": {
  //       "types": "./dist/types/index.d.ts",
  //       "import": "./dist/index.mjs",
  //       "require": "./dist/index.js"
  //     }
  //   }
  // }, null, 2);

  // fsMap.set("node_modules/hono/package.json", honoPackageJson);

  // // Add an index.d.ts at the package root as an alternative entry point
  // if (fsMap.has("node_modules/hono/dist/types/index.d.ts")) {
  //   const indexContent = fsMap.get("node_modules/hono/dist/types/index.d.ts");
  //   if (indexContent) {
  //     fsMap.set("node_modules/hono/index.d.ts", indexContent);
  //   }
  // }
}
