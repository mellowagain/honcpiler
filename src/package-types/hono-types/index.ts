// Main hono type definitions
import indexDts from "./files/index.ts?raw";
import honoDts from "./files/hono.ts?raw";
import honoBaseDts from "./files/hono-base.ts?raw";
import contextDts from "./files/context.ts?raw";
import requestDts from "./files/request.ts?raw";
import routerDts from "./files/router.ts?raw";
import typesDts from "./files/types.ts?raw";

// Utils type definitions
import headersDts from "./files/utils/headers.ts?raw";
import httpStatusDts from "./files/utils/http-status.ts?raw";
import utilTypesDts from "./files/utils/types.ts?raw";
import bodyDts from "./files/utils/body.ts?raw";
import mimeDts from "./files/utils/mime.ts?raw";

// Define interface for type definition files
interface TypeDefinition {
  path: string;
  content: string;
}

// Export all type definitions as an array of objects
const honoTypes: TypeDefinition[] = [
  {
    path: '/node_modules/hono/index.d.ts',
    content: indexDts
  },
  {
    path: '/node_modules/hono/hono.d.ts',
    content: honoDts
  },
  {
    path: '/node_modules/hono/hono-base.d.ts',
    content: honoBaseDts
  },
  {
    path: '/node_modules/hono/context.d.ts',
    content: contextDts
  },
  {
    path: '/node_modules/hono/request.d.ts',
    content: requestDts
  },
  {
    path: '/node_modules/hono/router.d.ts',
    content: routerDts
  },
  {
    path: '/node_modules/hono/types.d.ts',
    content: typesDts
  },
  {
    path: '/node_modules/hono/utils/headers.d.ts',
    content: headersDts
  },
  {
    path: '/node_modules/hono/utils/http-status.d.ts',
    content: httpStatusDts
  },
  {
    path: '/node_modules/hono/utils/types.d.ts',
    content: utilTypesDts
  },
  {
    path: '/node_modules/hono/utils/body.d.ts',
    content: bodyDts
  },
  {
    path: '/node_modules/hono/utils/mime.d.ts',
    content: mimeDts
  }
];

export default honoTypes;
