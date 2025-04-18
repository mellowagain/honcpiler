import { downloadTypeDefinitions } from "../src/download-type-definitions";

async function main() {
  const args = process.argv.slice(2);
  const packageName = args[0];

  if (!packageName) {
    console.error("Please provide a package name");
    process.exit(1);
  }
  
  console.log(`Downloading type definitions for ${packageName}`);
  
  try {
    const typeFiles = await downloadTypeDefinitions(packageName, true);
    
    console.log(`Successfully downloaded ${typeFiles.size} type definition files`);
    
    // Print a sample of the files
    const filesList = Array.from(typeFiles.keys());
    console.log(`First type definition file: ${filesList[0]}`);
    console.log(`${typeFiles.get(filesList[0])?.substring(0, 500)}...`);
    
  } catch (error) {
    console.error("Failed to download type definitions:", error);
  }
}

main().catch(console.error);

