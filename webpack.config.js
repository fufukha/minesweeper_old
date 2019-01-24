const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						]
					}
				}
			}, {
				test: /\.scss$/,
				use: [process.env.NODE_ENV !== 'production' ? 'style-loader' :MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	},
  plugins: [
  	new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      lang: 'en-US',
      title: 'Minesweeper',
      link: [
				{
					href: '/style.css',
					rel: 'stylesheet',
					type: 'text/css'
				}
			]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      allChunks: true
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
