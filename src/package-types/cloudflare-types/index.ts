import indexDts from "./files/index.d.ts?raw";

interface TypeDefinition {
  path: string;
  content: string;
}

const cloudflareWorkersTypes: TypeDefinition[] = [
  {
    path: '/node_modules/@cloudflare/workers-types/index.d.ts',
    content: indexDts
  },
 ];

export default cloudflareWorkersTypes;
