import { defineConfig, type Plugin } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://github.com/brettimus/ts-vfs-test/blob/main/vite.config.ts#L28C1-L42C2
const polyfillTypescriptPackage = (): Plugin => {
    return {
        name: "fix-typescript-filename",
        transform(code, id) {
            // Only transform the typescript package
            // HACK - This is the only way I could find to get the correct filename for the typescript package
            if (id.includes("node_modules") && id.includes("typescript.js")) {
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
  plugins: [polyfillTypescriptPackage(), cloudflare()],
});


