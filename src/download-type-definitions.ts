import { z } from "zod";

// Schema for the npm registry response (only what we use)
const NpmRegistrySchema = z.object({
  "dist-tags": z.object({
    latest: z.string(),
  }),
});

type NpmRegistry = z.infer<typeof NpmRegistrySchema>;

// Schema for package.json (only what we use)
const PackageJsonSchema = z.object({
  types: z.string().optional(),
  typings: z.string().optional(),
});

export async function downloadTypeDefinitions(packageName: string) {
  const packageInfo = await downloadPackage(packageName);
  const latestVersion = packageInfo["dist-tags"].latest;
  const baseUrl = `https://unpkg.com/${packageName}@${latestVersion}`;

  // First get the package.json to find the types entry point
  const packageJsonResponse = await fetch(`${baseUrl}/package.json`);
  const packageJsonRaw = await packageJsonResponse.json();
  const packageJson = PackageJsonSchema.parse(packageJsonRaw);

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

async function downloadPackage(packageName: string): Promise<NpmRegistry> {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  if (!response.ok) {
    throw new Error(`Failed to download package ${packageName}`);
  }

  const data = await response.json();
  return NpmRegistrySchema.parse(data);
}