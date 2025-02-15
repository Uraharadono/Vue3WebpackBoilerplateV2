//import globals from "globals";
//import pluginJs from "@eslint/js";
import tseslint from 'typescript-eslint';
//import pluginVue from "eslint-plugin-vue";

///** @type {import('eslint').Linter.Config[]} */
//export default [
//  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
//  {languageOptions: { globals: globals.browser }},
//  pluginJs.configs.recommended,
//  ...tseslint.configs.recommended,
//  ...pluginVue.configs["flat/essential"],
//  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
//];

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from '@typescript-eslint/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import configPrettier from 'eslint-config-prettier';

export default [
	pluginJs.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	configPrettier,

	{ files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },

	{
		plugins: {
			'@typescript-eslint': pluginTs,
			prettier: configPrettier,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			ecmaVersion: 2024,
			// parser: 'vue-eslint-parser',
			parserOptions: {
				ecmaFeatures: { jsx: true },
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.vue'],
				sourceType: 'module',
			},
		},

		rules: {
			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'keyword-spacing': ['error', { after: true }],
			semi: 'error',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			//'prettier/prettier': [
			//  'error',
			//  {
			//    endOfLine: 'auto',
			//  },
			//],
			'vue/multi-word-component-names': 'off',
			// 'arrow-body-style': ['error', 'as-needed'],
			// 'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		},
	},

	{
		files: ['service/**/*.js', '.prettierrc.js', '.stylelintrc.js', 'babel.config.js'],

		languageOptions: {
			globals: {
				...globals.node,
			},
		},

		rules: {
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-require-imports': 'off',
		},
	},

	{
		ignores: ['dist'],
	},
];
