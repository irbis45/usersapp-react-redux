const webpack              = require('webpack'),
      HtmlWebpackPlugin    = require('html-webpack-plugin'),
      path                 = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      distPath             = path.join(__dirname, '/public');

module.exports = env => {
	return {
		mode        : env && env.dev ? 'development' : 'production',
		entry       : {
			main  : './src/index.js',
			vendor: ['babel-polyfill', 'react', 'react-dom'],
		},
		devtool     : env && env.dev ? 'eval' : 'inline-source-map',
		devServer   :
			{
				contentBase       : distPath,
				historyApiFallback:
					true
			}
		,
		output      : {
			filename     : '[name].js',
			chunkFilename:
				'[name].js',
			path         :
				path.resolve(__dirname, './public/build/')
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						chunks : 'initial',
						name   : 'vendor',
						test   : 'vendor',
						enforce: true
					}
				}
			}
		},
		plugins     : [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(env && env.dev ? 'development' : 'production')
			}),
			new HtmlWebpackPlugin({
				template: './src/index.html'
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css'
			})
		],
		module      :
			{
				rules: [
					{
						test   : /\.jsx?$/,
						exclude: [/node_modules/, /public/, /server/],
						enforce: 'pre',
						loader : 'eslint-loader'
					},
					{
						test   : /\.jsx?$/,
						exclude: [/node_modules/, /build/],
						use    : ['babel-loader']
					},
					{
						test: /\.(sass|css)$/,
						use : [
							{
								loader : MiniCssExtractPlugin.loader,
								options: {
									publicPath: './public/build/'
								}
							},
							{
								loader : 'css-loader',
								options: {
									minimize: true
								}
							},
							{
								loader : 'sass-loader',
								options: {
									strictMath: true,
									noIeCompat: true,
								}
							}
						]
					},
					{
						test  : /\.(png|woff|woff2|eot|ttf|svg)$/,
						loader: 'url-loader?limit=100000'
					}
				]
			}
		,
		resolve     : {
			extensions: ['.js', '.json', '.jsx', '*']
		}
	}
};