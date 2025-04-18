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

export async function downloadTypeDefinitions(packageName: string, debug = false) {
  const packageInfo = await downloadPackage(packageName);
  const latestVersion = packageInfo["dist-tags"].latest;
  const baseUrl = `https://unpkg.com/${packageName}@${latestVersion}`;

  // First get the package.json to find the types entry point
  const packageJsonResponse = await fetch(`${baseUrl}/package.json`);
  const packageJsonRaw = await packageJsonResponse.json();
  const packageJson = PackageJsonSchema.parse(packageJsonRaw);

  const typesEntry = packageJson.types || packageJson.typings || "index.d.ts";
  const typeFiles = new Map<string, string>();
  const processedFiles = new Set<string>();

  // Download type definitions recursively
  await downloadTypeFile(baseUrl, typesEntry, packageName, typeFiles, processedFiles, debug);

  if (debug) {
    console.log(`Downloaded ${typeFiles.size} type definition files for ${packageName}`);
    console.log('Files:', Array.from(typeFiles.keys()).join('\n'));
  }

  return typeFiles;
}

async function downloadTypeFile(
  baseUrl: string, 
  filePath: string, 
  packageName: string, 
  typeFiles: Map<string, string>,
  processedFiles: Set<string>,
  debug = false
) {
  // Normalize the file path
  const normalizedPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  const modulePath = `/node_modules/${packageName}/${normalizedPath}`;
  
  // Skip if already processed
  if (processedFiles.has(modulePath)) {
    return;
  }
  
  processedFiles.add(modulePath);
  
  // Download the file
  try {
    const fileUrl = `${baseUrl}/${normalizedPath}`;
    if (debug) {
      console.log(`Downloading ${fileUrl}`);
    }
    
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      console.warn(`Failed to download ${fileUrl}: ${response.status}`);
      return;
    }
    
    const content = await response.text();
    typeFiles.set(modulePath, content);
    
    // Handle .d.ts files only for importing
    if (!normalizedPath.endsWith('.d.ts')) {
      return;
    }
    
    // Parse import statements to find referenced files
    const importPaths = extractImports(content);
    
    if (debug && importPaths.length > 0) {
      console.log(`Found ${importPaths.length} imports in ${normalizedPath}`);
    }
    
    // Process each imported file
    for (const importPath of importPaths) {
      // Handle relative imports within the package
      if (importPath.startsWith('./') || importPath.startsWith('../')) {
        const importDir = normalizedPath.split('/').slice(0, -1).join('/');
        const resolvedPath = resolveRelativePath(importDir, importPath);
        
        // Add .d.ts extension if missing
        let finalPath = resolvedPath;
        if (!finalPath.endsWith('.d.ts') && !finalPath.endsWith('.ts')) {
          finalPath = `${finalPath}.d.ts`;
        }
        
        await downloadTypeFile(baseUrl, finalPath, packageName, typeFiles, processedFiles, debug);
      }
    }
  } catch (error) {
    console.error(`Error downloading ${normalizedPath}:`, error);
  }
}

// Extract import paths from TypeScript declaration file
function extractImports(content: string): string[] {
  const imports: string[] = [];
  
  // Match ES6 imports: import { x } from './path';
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null = null;
  
  do {
    match = importRegex.exec(content);
    if (match) {
      imports.push(match[1]);
    }
  } while (match);
  
  // Also check for triple-slash references
  const referenceRegex = /\/\/\/\s*<reference\s+path=['"]([^'"]+)['"]/g;
  match = null;
  
  do {
    match = referenceRegex.exec(content);
    if (match) {
      imports.push(match[1]);
    }
  } while (match);
  
  return imports;
}

// Resolve a relative path based on the current directory
function resolveRelativePath(baseDir: string, relativePath: string): string {
  // Convert to array of path segments
  const baseParts = baseDir.split('/');
  const relativeParts = relativePath.split('/');
  
  // Handle './' at the start (current directory)
  if (relativeParts[0] === '.') {
    relativeParts.shift();
  }
  
  // Start with base directory
  const resultParts = [...baseParts];
  
  // Process relative path parts
  for (const part of relativeParts) {
    if (part === '..') {
      // Go up one directory
      resultParts.pop();
    } else if (part !== '.') {
      // Add the path segment
      resultParts.push(part);
    }
  }
  
  return resultParts.join('/');
}

async function downloadPackage(packageName: string): Promise<NpmRegistry> {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  if (!response.ok) {
    throw new Error(`Failed to download package ${packageName}`);
  }

  const data = await response.json();
  return NpmRegistrySchema.parse(data);
}