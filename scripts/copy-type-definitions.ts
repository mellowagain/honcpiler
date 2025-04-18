import fs from 'node:fs';
import path from 'node:path';

// Execute the function
copyTypeDefinitions().catch(error => {
  console.error('Error copying type definitions:', error);
  process.exit(1);
}); 

async function copyTypeDefinitions() {
  // Create the destination directory if it doesn't exist
  const destDir = path.resolve('src/hono-types/files');
  fs.mkdirSync(destDir, { recursive: true });

  // Read the todo.txt file that lists all the type definition files
  const todoPath = path.resolve('src/hono-types/todo.txt');
  const filesList = fs.readFileSync(todoPath, 'utf-8').split('\n').filter(Boolean);
  
  console.log(`Found ${filesList.length} type definition files to copy`);
  
  let successCount = 0;
  let failureCount = 0;

  for (const file of filesList) {
    try {
      // Get the directory structure we want (hono/dist/types/...)
      const parts = file.split('/');
      const packageIndex = parts.indexOf('node_modules') + 1;
      
      // Extract the package name and the rest of the path
      const packageName = parts[packageIndex];
      const pathAfterPackage = parts.slice(packageIndex + 1).join('/');
      
      // Set up source and destination paths
      const sourcePath = path.resolve(file);
      const targetDir = path.resolve(destDir, pathAfterPackage.replace(/\/[^/]+$/, ''));
      const targetPath = path.resolve(targetDir, path.basename(file));
      
      // Create the target directory structure
      fs.mkdirSync(targetDir, { recursive: true });
      
      // Copy the file if it exists
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✓ Copied ${file} to ${path.relative(process.cwd(), targetPath)}`);
        successCount++;
      } else {
        console.warn(`✗ Source file not found: ${sourcePath}`);
        failureCount++;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`✗ Failed to process ${file}: ${error.message}`);
      } else {
        console.error(`✗ Failed to process ${file}: Unknown error`);
      }
      failureCount++;
    }
  }
  
  console.log(`
Copy operation completed:
- ${successCount} files copied successfully
- ${failureCount} files failed
`);
}

