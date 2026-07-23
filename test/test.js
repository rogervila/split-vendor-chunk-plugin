const assert = require('node:assert');
const splitVendorChunkPlugin = require('../main.js');

describe('splitVendorChunkPlugin', () => {
    it('should return a plugin with correct name', () => {
        const plugin = splitVendorChunkPlugin();
        assert.strictEqual(plugin.name, 'split-vendor-chunk-plugin');
    });

    it('should correctly identify and split node_modules chunks', () => {
        const plugin = splitVendorChunkPlugin();
        const config = plugin.config();

        // Test regular node_modules path
        const result1 = config.build.rollupOptions.output.manualChunks('/path/to/node_modules/lodash/index.js');
        assert.strictEqual(result1, 'lodash');

        // Test scoped package
        const result2 = config.build.rollupOptions.output.manualChunks('/path/to/node_modules/@babel/core/index.js');
        assert.strictEqual(result2, '@babel/core');

        // Test non-node_modules path
        const result3 = config.build.rollupOptions.output.manualChunks('/path/to/src/index.js');
        assert.strictEqual(result3, undefined);
    });

    it('should anonymize chunk names when options are provided', () => {
        const options = {
            anonymize: {
                algorithm: 'sha1',
                key: 'my-secret-key',
            },
        };
        const plugin = splitVendorChunkPlugin(options);
        const config = plugin.config();

        // Test anonymization
        const result = config.build.rollupOptions.output.manualChunks('/path/to/node_modules/lodash/index.js');
        assert.strictEqual(result, 'a98bec2c6f7ce1c386856d4d320f1e19c83742f5');
    });
});
