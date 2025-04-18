// Main hono type definitions
import indexDts from "./files/index.d.ts?raw";
import honoDts from "./files/hono.d.ts?raw";
import honoBaseDts from "./files/hono-base.d.ts?raw";
import contextDts from "./files/context.d.ts?raw";
import requestDts from "./files/request.d.ts?raw";
import routerDts from "./files/router.d.ts?raw";
import typesDts from "./files/types.d.ts?raw";

// Utils type definitions
import headersDts from "./files/utils/headers.d.ts?raw";
import httpStatusDts from "./files/utils/http-status.d.ts?raw";
import utilTypesDts from "./files/utils/types.d.ts?raw";
import bodyDts from "./files/utils/body.d.ts?raw";
import mimeDts from "./files/utils/mime.d.ts?raw";

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
