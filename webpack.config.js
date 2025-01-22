const path = require("path");

module.exports = {
	// Entry point for the application
	entry: "./app.js",

	// Output configuration for the bundled file
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},

	// Module rules for processing files
	module: {
		rules: [
			{
				test: /\.js$/, // Process JavaScript files
				exclude: /node_modules/, // Exclude the node_modules directory
				use: {
					loader: "babel-loader", // Use Babel for transpiling JavaScript
					options: {
						presets: ["@babel/preset-env"], // Use the preset for modern JavaScript
					},
				},
			},
		],
	},

	// Resolve fallbacks for Node.js modules in the browser
	resolve: {
		fallback: {
			http: require.resolve("stream-http"),
			path: require.resolve("path-browserify"),
			crypto: require.resolve("crypto-browserify"),
			fs: false,
			stream: require.resolve("stream-browserify"),
			zlib: require.resolve("browserify-zlib"),
			querystring: require.resolve("querystring-es3"),
			string_decoder: require.resolve("string_decoder/"),
			net: false, // Exclude `net` as it's not needed in the browser
			timers: require.resolve("timers-browserify"),
		},
	},

	// Set Webpack mode to development for easier debugging
	mode: "development",
};
