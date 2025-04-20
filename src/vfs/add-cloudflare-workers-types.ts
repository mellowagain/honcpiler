import cloudflareWorkersTypes from "../package-types/cloudflare-types";

/**
 * Add the Cloudflare Workers type definitions to the fsMap
 * As of writing, this should only be the `index.d.ts` file from `@cloudflare/workers-types`
 *
 * @NOTE - Mutates the fsMap input
 */
export function addCloudflareWorkersTypes(fsMap: Map<string, string>) {
  for (const typeDef of cloudflareWorkersTypes) {
    fsMap.set(typeDef.path, typeDef.content);
  }
}