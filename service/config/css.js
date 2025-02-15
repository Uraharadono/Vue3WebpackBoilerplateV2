'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

const plugins = [];
if (isProd) {
	const filename = 'css/[name].[contenthash:8].css';

	plugins.push(
		new MiniCssExtractPlugin({
			filename,
			chunkFilename: filename,
		}),
	);
}

const genStyleRules = () => {
	const cssLoader = {
		loader: 'css-loader',
		options: {
			// how many loaders before css-loader should be applied to [@import]ed resources.
			// stylePostLoader injected by vue-loader + postcss-loader
			importLoaders: 1 + 1,
			esModule: false, // css-loader using ES Modules as default in v4, but vue-style-loader support cjs only.
		},
	};
	const postcssLoader = {
		loader: 'postcss-loader',
		options: {
			postcssOptions: {
				plugins: [require('autoprefixer')],
			},
		},
	};
	const extractPluginLoader = {
		loader: MiniCssExtractPlugin.loader,
	};
	const vueStyleLoader = {
		loader: 'vue-style-loader',
	};

	function createCSSRule(test, loader, loaderOptions) {
		const loaders = [cssLoader, postcssLoader];

		if (isProd) {
			loaders.unshift(extractPluginLoader);
		} else {
			loaders.unshift(vueStyleLoader);
		}

		if (loader) {
			loaders.push({
				loader,
				options: {
					...loaderOptions,
					// I have to do this, to do silent fail of warnings.
					// Because I cannot upgrade whole project to use new sass import syntaxt, due to bootstrap not using it as well.
					// I will get mixing errors in the end, and there is not reason for me to get them.
					sassOptions: {
						quietDeps: true, // Suppress dependency warnings
						logger: {
							warn: () => {}, // Suppress warnings
							debug: () => {}, // Suppress debug logs
						},
					},
				},
			});
		}

		return { test, use: loaders };
	}

	return [
		createCSSRule(/\.css$/),
		createCSSRule(/\.p(ost)?css$/),
		createCSSRule(/\.scss$/, 'sass-loader'),
	];
};

module.exports = {
	plugins,
	module: {
		rules: genStyleRules(),
	},
};
