var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["babel-polyfill", "./app/index.js"],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "build_result.js",
		publicPath: "/"
	},
	devServer: {
		historyApiFallback: true
	},
	module:{
		rules:[
			{test: /\.(js)$/, use:"babel-loader"},
			{test: /\.(css)$/, use:["style-loader", "css-loader"]}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./app/index.html"
		})
	]
}