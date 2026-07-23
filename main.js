/**
 * @see https://github.com/rxliuli/liuli-tools/blob/master/archives/vite-plugin-chunk-node-modules/src/index.ts
 *
 * @param {{ anonymize?: undefined | {algorithm?: string, key?: string} }} options
 * @returns {import('vite').Plugin}
 */
function splitVendorChunkPlugin(options = {}) {
    /** @type {import('vite').Plugin} */
    return {
        name: 'split-vendor-chunk-plugin',
        config() {
            return {
                build: {
                    rollupOptions: {
                        output: {
                            manualChunks(id) {
                                if (id.includes('node_modules')) {
                                    const match = /.*node_modules\/((?:@[^\/]+\/)?[^\/]+)/.exec(id);
                                    const value = match !== null && match.length > 0 ? match[1] : 'vendor';

                                    if (options.anonymize?.algorithm && options.anonymize?.key) {
                                        const crypto = require('node:crypto');
                                        return crypto
                                            .createHmac(options.anonymize.algorithm, options.anonymize.key)
                                            .update(value)
                                            .digest('hex');
                                    }

                                    return value;
                                }
                            },
                        },
                    },
                },
            };
        },
    };
}

module.exports = splitVendorChunkPlugin;
