# Vite Split Vendor Chunk Plugin

[![npm version](https://badge.fury.io/js/split-vendor-chunk-plugin.svg)](https://badge.fury.io/js/split-vendor-chunk-plugin)
[![test](https://github.com/rogervila/split-vendor-chunk-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/rogervila/split-vendor-chunk-plugin/actions/workflows/test.yml)

A Vite plugin that automatically splits vendor chunks from node_modules into separate files. This helps optimize your build by:

- Improving caching efficiency
- Reducing main bundle size
- Enabling parallel loading of dependencies

## Installation

```bash
npm install split-vendor-chunk-plugin --save-dev
```

## Usage

In your `vite.config.js`:

```javascript
import splitVendorChunkPlugin from 'split-vendor-chunk-plugin'

export default {
  plugins: [
    splitVendorChunkPlugin()
  ]
}
```

## Options

The plugin accepts an optional configuration object with the following properties:

### `prefix`

Type: `string | undefined`
Default: `''`

Add a prefix to all generated chunk names:

```javascript
splitVendorChunkPlugin({
  prefix: 'vendor-'
})
```

This will generate chunk names like `vendor-lodash-<hash>.js`, `vendor-@babel/core-<hash>.js`, etc.

### `anonymize`

Type: `{ algorithm?: string, key?: string } | undefined`
Default: `undefined`

Enable anonymization of package names using HMAC hashing. When enabled, package names are replaced with their hashed values:

```javascript
splitVendorChunkPlugin({
  anonymize: {
    algorithm: 'sha256',
    key: 'your-secret-key'
  }
})
```

Both `algorithm` and `key` must be specified for anonymization to work. The `algorithm` should be a valid Node.js HMAC algorithm (e.g., `'sha256'`, `'sha512'`, `'md5'`).

With anonymization, chunks will be named like `a3f2c1d9e4b6f8a2...` instead of `lodash-<hash>.js`.

### Complete Example

```javascript
import splitVendorChunkPlugin from 'split-vendor-chunk-plugin'

export default {
  plugins: [
    splitVendorChunkPlugin({
      prefix: 'lib-',
      anonymize: {
        algorithm: 'sha256',
        key: process.env.VITE_CHUNK_HASH_KEY || 'default-key'
      }
    })
  ]
}
```

## How it works

The plugin automatically detects imports from `node_modules` and splits them into separate chunks:

- Regular packages: `node_modules/lodash` → `lodash-<hash>.js`
- Scoped packages: `node_modules/@babel/core` → `@babel/core-<hash>.js`
- Other node_modules: grouped into `vendor-<hash>.js`

With a prefix, all chunks are prefixed accordingly. With anonymization enabled, package names are replaced with their HMAC hashes for obfuscation.

## License

MIT © [Roger Vilà](https://github.com/rogervila)
