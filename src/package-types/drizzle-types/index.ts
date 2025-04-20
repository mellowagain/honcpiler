// Main drizzle type definitions
import indexDts from "./files/index.d.ts?raw";
import driverDts from "./files/d1/driver.d.ts?raw";
import d1IndexDts from "./files/d1/index.d.ts?raw";
import migratorDts from "./files/d1/migrator.d.ts?raw";
import sessionDts from "./files/d1/session.d.ts?raw";

// Define interface for type definition files
interface TypeDefinition {
  path: string;
  content: string;
}

// Export all type definitions as an array of objects
const drizzleTypes: TypeDefinition[] = [
  {
    path: '/node_modules/drizzle-orm/index.d.ts',
    content: indexDts
  },
  {
    path: '/node_modules/drizzle-orm/d1/driver.d.ts',
    content: driverDts
  },
  {
    path: '/node_modules/drizzle-orm/d1/index.d.ts',
    content: d1IndexDts
  },
  {
    path: '/node_modules/drizzle-orm/d1/migrator.d.ts',
    content: migratorDts
  },
  {
    path: '/node_modules/drizzle-orm/d1/session.d.ts',
    content: sessionDts
  }
];

export default drizzleTypes;
