import { createHmac } from 'node:crypto';

/**
 * @see https://github.com/rxliuli/liuli-tools/blob/master/archives/vite-plugin-chunk-node-modules/src/index.ts
 *
 * @param {{ anonymize?: undefined | {algorithm?: string, key?: string}, prefix: string | undefined }} options
 * @returns {import('vite').Plugin}
 */
export default function splitVendorChunkPlugin(options = {}) {
    const prefix = options.prefix || '';

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
                                    const value =
                                        match !== null && match.length > 0
                                            ? match[1]
                                            : `vendor-${createHmac('sha256', id).update(id).digest('hex')}`;

                                    if (options.anonymize?.algorithm && options.anonymize?.key) {
                                        return `${prefix}${createHmac(
                                            options.anonymize.algorithm,
                                            options.anonymize.key,
                                        )
                                            .update(value)
                                            .digest('hex')}`;
                                    }

                                    return `${prefix}${value}`;
                                }
                            },
                        },
                    },
                },
            };
        },
    };
}
