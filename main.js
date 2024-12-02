/** @see https://github.com/rxliuli/liuli-tools/blob/master/archives/vite-plugin-chunk-node-modules/src/index.ts */
function splitVendorChunkPlugin() {
	/** @type {import('vite').Plugin} */
	const plugin = {
		name: "split-vendor-chunk-plugin",
		config() {
			return {
				build: {
					rollupOptions: {
						output: {
							manualChunks(id) {
								if (id.includes("node_modules")) {
									const match = /.*node_modules\/((?:@[^\/]+\/)?[^\/]+)/.exec(
										id,
									);
									return match !== null && match.length > 0
										? match[1]
										: "vendor";
								}
							},
						},
					},
				},
			};
		},
	};

	return plugin;
}

module.exports = splitVendorChunkPlugin;
