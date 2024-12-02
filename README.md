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

## How it works

The plugin automatically detects imports from `node_modules` and splits them into separate chunks:

- Regular packages: `node_modules/lodash` → `lodash-<hash>.js`
- Scoped packages: `node_modules/@babel/core` → `@babel/core-<hash>.js`
- Other node_modules: grouped into `vendor-<hash>.js`

## License

MIT © [Roger Vilà](https://github.com/rogervila)
