const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

/** @type {import('webpack').Configuration} */

const devConfig = {
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [new ReactRefreshWebpackPlugin()],
	devServer: {
		port: 3000,
		allowedHosts: 'all', // Permite acceder desde cualquier hostname
		static: {
			directory: path.resolve(__dirname, '../public'),
		},
		hot: true,
		open: true,
	},
}
module.exports = merge(common, devConfig)
