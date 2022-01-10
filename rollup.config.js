import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import dotenv from 'dotenv';
import manifest from './manifest.json';

dotenv.config();

const pluginName = manifest['id'];

const isProd = (process.env.BUILD === 'production');

const vault = process.env.TEST_VAULT || './vault';
const pluginDir = `${vault}/.obsidian/plugins/${pluginName}`;

const banner = 
`/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

export default {
	input: 'src/main.ts',
	output: {
		dir: pluginDir,
		sourcemap: 'inline',
		sourcemapExcludeSources: isProd,
		format: 'cjs',
		exports: 'default',
		banner,
	},
	external: ['obsidian'],
	plugins: [
		typescript(),
		nodeResolve({browser: true}),
		commonjs(),
		copy({
			targets: [
				{ src: 'manifest.json', dest: pluginDir },
				{ src: 'styles.css', dest: pluginDir },
			],
		}),
	]
};
