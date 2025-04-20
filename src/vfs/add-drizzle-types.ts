import drizzleTypes from "../package-types/drizzle-types";

/**
 * Add the Drizzle and Drizzle-D1 type definitions to the fsMap
 * @NOTE - Mutates the fsMap input
 */
export function addDrizzleTypes(fsMap: Map<string, string>) {
  // Add all the Drizzle type definition files
  for (const typeDef of drizzleTypes) {
    fsMap.set(typeDef.path, typeDef.content);
  }
}
