import del from 'rollup-plugin-delete'
import fg from 'fast-glob'
import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import minifyHTML from 'rollup-plugin-minify-html-literals'
import commonjs from '@rollup/plugin-commonjs'
const production = process.env.NODE_ENV == 'production'
export default {
	input: 'frontend/index.js',
	treeshake: production,
	output: {
		dir: 'src/main/resources/resources',
		format: 'es',
		preserveModules: !production,
		preserveModulesRoot: 'src',
	},
	watch: {
		exclude: 'node_modules/**, server/**',
		clearScreen: false,
	},
	preserveEntrySignatures: 'allow-extension',
	plugins: [
		del({targets: 'src/main/resources/resources', runOnce: true}),
		nodeResolve({moduleDirectories: ['node_modules', 'frontend']}),
		commonjs(),
		copy({
			targets: [
				{src: 'frontend/images/*', dest: 'src/main/resources/resources/images'},
				{src: 'frontend/manifest.json', dest: 'src/main/resources/resources'},
				{src: 'frontend/service-worker.js', dest: 'src/main/resources/resources'},
				{src: 'frontend/index.html', dest: 'src/main/resources/resources'},
				{src: 'frontend/robots.txt', dest: 'src/main/resources/resources'},
			],
		}),
		...(production
			? [minifyHTML(), terser()]
			: [
					{
						name: 'watch-external',
						async buildStart() {
							const files = await fg('frontend/**/*')
							for (let file of files) {
								this.addWatchFile(file)
							}
						},
					},
			  ]),
	],
}
