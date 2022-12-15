'use strict';

const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./base');
const cssWebpackConfig = require('./css');
const config = require('../project.config');

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
	mode: 'development',

	devtool: 'eval-cheap-module-source-map',

	devServer: {
		historyApiFallback: {
			rewrites: [{ from: /./, to: '/index.html' }],
		},
		devMiddleware: {
			publicPath: config.dev.publicPath,
		},
		open: true,
		host: '127.0.0.4',
		port: config.dev.port,
		liveReload: true,
	},

	infrastructureLogging: {
		level: 'warn',
	},

	stats: {
		assets: false,
		modules: false,
	},
});
