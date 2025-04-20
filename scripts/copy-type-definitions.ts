import fs from 'node:fs';
import path from 'node:path';

/**
 * TypeScript Definition Copier
 * 
 * This script scans package.json files to find type definitions and copies them to a target directory.
 * 
 * Example usage:
 * ```
 * # Copy types to default directory (src/hono-types/files)
 * ts-node scripts/copy-type-definitions.ts
 * 
 * # Copy types to a custom directory
 * ts-node scripts/copy-type-definitions.ts --output=./custom/types/dir
 * 
 * # Copy types for a specific package
 * ts-node scripts/copy-type-definitions.ts --package=hono
 * ```
 */

// Parse command line arguments
const args = process.argv.slice(2);
const options: { output?: string, package?: string } = {};

for (const arg of args) {
  if (arg.startsWith('--output=')) {
    options.output = arg.split('=')[1];
  } else if (arg.startsWith('--package=')) {
    options.package = arg.split('=')[1];
  }
}

/**
 * Resolves a package path, handling subpackages with forward slashes
 */
function resolvePackagePath(packageName: string): string {
  // Handle subpackages with forward slashes
  if (packageName.includes('/')) {
    const parts = packageName.split('/');
    const basePackage = parts[0];
    const subPath = parts.slice(1).join('/');
    return path.join(path.resolve('node_modules'), basePackage, subPath);
  }
  return path.join(path.resolve('node_modules'), packageName);
}

// Execute the function
copyTypeDefinitions(options).catch(error => {
  console.error('Error copying type definitions:', error);
  process.exit(1);
});

async function copyTypeDefinitions(options: { output?: string, package?: string } = {}) {
  // Set the destination directory (default or from arguments)
  const destDir = path.resolve(options.output || 'src/hono-types/files');
  fs.mkdirSync(destDir, { recursive: true });
  
  console.log(`Target directory: ${destDir}`);
  
  // Find packages to process
  const nodeModulesPath = path.resolve('node_modules');
  const packageToProcess = options.package;
  
  let packageDirs: string[] = [];
  
  if (packageToProcess) {
    // Process a specific package
    const packagePath = resolvePackagePath(packageToProcess);
    if (fs.existsSync(packagePath)) {
      packageDirs.push(packagePath);
    } else {
      console.error(`Package not found: ${packageToProcess}`);
      process.exit(1);
    }
  } else {
    // Get all packages from node_modules (direct dependencies only)
    try {
      const rootPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
      const dependencies = {
        ...rootPackageJson.dependencies || {},
        ...rootPackageJson.devDependencies || {}
      };
      
      packageDirs = Object.keys(dependencies)
        .map(dep => path.join(nodeModulesPath, dep))
        .filter(dir => fs.existsSync(dir));
    } catch (error) {
      console.error('Failed to read package.json:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  }
  
  console.log(`Found ${packageDirs.length} packages to scan for type definitions`);
  
  let successCount = 0;
  let failureCount = 0;
  let skippedCount = 0;

  for (const packageDir of packageDirs) {
    try {
      const packageJsonPath = path.join(packageDir, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        console.warn(`No package.json found for ${path.basename(packageDir)}`);
        skippedCount++;
        continue;
      }
      
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const packageName = packageJson.name || path.basename(packageDir);
      
      // Look for type definition paths
      const typesPath = packageJson.types || packageJson.typings;
      
      if (!typesPath) {
        console.log(`No types defined in package.json for ${packageName}`);
        
        // Check for a types directory or index.d.ts as fallback
        const possibleTypesLocations = [
          path.join(packageDir, 'types'),
          path.join(packageDir, 'dist/types'),
          path.join(packageDir, 'index.d.ts'),
          path.join(packageDir, 'dist/index.d.ts')
        ];
        
        let typesFound = false;
        
        for (const location of possibleTypesLocations) {
          if (fs.existsSync(location)) {
            if (location.endsWith('.d.ts')) {
              // Single file
              await copyTypeDef(location, packageDir, destDir);
              successCount++;
              typesFound = true;
            } else {
              // Directory of type definitions
              const typeFiles = findTypeDefinitionFiles(location);
              for (const typeFile of typeFiles) {
                await copyTypeDef(typeFile, packageDir, destDir);
                successCount++;
              }
              if (typeFiles.length > 0) {
                typesFound = true;
              }
            }
          }
        }
        
        if (!typesFound) {
          console.log(`No type definitions found for ${packageName}`);
          skippedCount++;
        }
      } else {
        // Process the defined types file/directory
        const typesFullPath = path.join(packageDir, typesPath);
        
        if (fs.existsSync(typesFullPath)) {
          if (typesFullPath.endsWith('.d.ts')) {
            // Single type definition file
            await copyTypeDef(typesFullPath, packageDir, destDir);
            successCount++;
          } else if (fs.statSync(typesFullPath).isDirectory()) {
            // Directory with type definitions
            const typeFiles = findTypeDefinitionFiles(typesFullPath);
            for (const typeFile of typeFiles) {
              await copyTypeDef(typeFile, packageDir, destDir);
              successCount++;
            }
          }
        } else {
          console.warn(`Types path does not exist: ${typesFullPath}`);
          failureCount++;
        }
      }
    } catch (error) {
      console.error(`Error processing ${path.basename(packageDir)}: ${error instanceof Error ? error.message : error}`);
      failureCount++;
    }
  }
  
  console.log(`
Copy operation completed:
- ${successCount} files copied successfully
- ${failureCount} failures
- ${skippedCount} packages skipped (no types found)
`);
}

/**
 * Recursively finds all .d.ts files in a directory
 */
function findTypeDefinitionFiles(directory: string): string[] {
  const results: string[] = [];
  
  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.endsWith('.d.ts')) {
        results.push(fullPath);
      }
    }
  }
  
  scanDir(directory);
  return results;
}

/**
 * Copies a type definition file to the target directory
 */
async function copyTypeDef(sourceFile: string, packageDir: string, destDir: string): Promise<void> {
  // Calculate the relative path within the package
  const relativeToPackage = path.relative(packageDir, sourceFile);
  
  // Determine the target path
  const targetPath = path.join(destDir, relativeToPackage);
  const targetDir = path.dirname(targetPath);
  
  // Create the target directory
  fs.mkdirSync(targetDir, { recursive: true });
  
  // Copy the file
  fs.copyFileSync(sourceFile, targetPath);
  console.log(`✓ Copied ${path.relative(process.cwd(), sourceFile)} to ${path.relative(process.cwd(), targetPath)}`);
}

