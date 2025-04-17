import { defineConfig, type Plugin } from "vite";
import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare';
import nodeAdapter from '@hono/vite-dev-server/node';

// https://github.com/brettimus/ts-vfs-test/blob/main/vite.config.ts#L28C1-L42C2
const polyfillTypescriptPackage = (): Plugin => {
    return {
        name: "fix-typescript-filename",
        transform(code, id) {
            // Only transform the typescript package
            if (id.includes("node_modules/typescript/")) {
                // Replace __filename with a string that won't break in Cloudflare Workers
                // Replace Node.js specific variables with appropriate defaults
                return code
                    .replace(/__filename/g, '"/virtual-typescript-path"')
                    .replace(/process\.argv/g, '[]');
            }
        }
    }
}

export default defineConfig({
    plugins: [polyfillTypescriptPackage(), devServer({entry: "src/index.ts", injectClientScript: false, adapter: nodeAdapter})],
});


