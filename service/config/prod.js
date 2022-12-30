'use strict';

const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const baseWebpackConfig = require('./base');
const cssWebpackConfig = require('./css');
const config = require('../project.config');
const terserOptions = require('./terserOptions');

// Analyze sizes of our production bundle
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
	mode: 'production',

	// I only need to analyze sizes of our production bundle, since I don't care about development and it is deployed in memory using DevServer anyways
	plugins: [new BundleAnalyzerPlugin()],

	output: {
		publicPath: config.build.publicPath,
	},

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(terserOptions())],
		moduleIds: 'deterministic',
		splitChunks: {
			cacheGroups: {
				defaultVendors: {
					name: `chunk-vendors`,
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial',
				},
				common: {
					name: `chunk-common`,
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true,
				},
			},
		},
	},
});
