const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (isProd) {
		config.minimizer = [
			new CssMinimizerWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}
const plugins = () => {
	const base = [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/images/favicon/favicon.ico'),
					to: path.resolve(__dirname, 'dist')
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: fileName('css'),
		}),
		new ESLintPlugin()
	]

	if (isProd) {
		base.push(new BundleAnalyzerPlugin())
	}

	return base
}

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		 main: ['@babel/polyfill', './index.js'],
	},
	output: {
		filename: fileName('js'),
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.json', '.png', '.css', '.scss'],
		alias: {
			'@style': path.resolve(__dirname, 'src/assets/scss'),
			'@images': path.resolve(__dirname, 'src/assets/images'),
			'@common': path.resolve(__dirname, 'src/common'),
		}
	},
	optimization: optimization(),
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
	},
	devtool: isDev ? 'source-map' : 'hidden-source-map',
	plugins: plugins(),
	module:{
		rules: [
			{
				test: /\.css$/i,
				use: cssLoaders(),
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
				use: 'assets/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)&/i,
				type: 'asset/resource'
			},
			{
				test: /\.m?js$/,
				exclude: /node-modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties'
						]
					},
				},
			},
		]
	}
}
