import del from 'rollup-plugin-delete'
import fg from 'fast-glob'
import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import minifyHTML from 'rollup-plugin-minify-html-literals'
import modulepreload from 'rollup-plugin-modulepreload'
const production = process.env.NODE_ENV == 'production'
function shouldPreload({code}) {
	return !!code && code.includes('markdown-element')
}
export default {
	input: 'frontend/index.js',
	treeshake: production,
	output: {
		dir: 'src/main/resources/resources',
		format: 'es',
		preserveModules: !production,
		preserveModulesRoot: 'frontend',
	},
	watch: {
		exclude: 'node_modules/**, server/**',
		clearScreen: false,
	},
	preserveEntrySignatures: 'allow-extension',
	plugins: [
		del({targets: 'src/main/resources/resources', runOnce: true}),
		nodeResolve({moduleDirectories: ['node_modules', 'frontend']}),
		css({output: 'bundle.css'}),
		copy({
			targets: [
				{src: 'frontend/images/*', dest: 'src/main/resources/resources/images'},
				{src: 'frontend/manifest.json', dest: 'src/main/resources/resources'},
				{src: 'frontend/service-worker.js', dest: 'src/main/resources/resources'},
				{src: 'frontend/index.html', dest: 'src/main/resources/resources'},
				{src: 'frontend/index.html', dest: 'src/main/resources/resources/error', rename: '404.html'},
				{src: 'frontend/js/sendAuthenticated.js', dest: 'src/main/resources/resources'},
				{src: 'frontend/robots.txt', dest: 'src/main/resources/resources'},
				{src: 'node_modules/prismjs/themes/prism.css', dest: 'src/main/resources/resources/node_modules/prismjs/themes'},
				{src: 'node_modules/@fortawesome/fontawesome-free/sprites', dest: 'src/main/resources/resources/node_modules/@fortawesome/fontawesome-free'},
				...(production ? [{src: 'node_modules/@lrnwebcomponents/simple-icon/lib/svgs', dest: 'src/main/resources/resources'}] : [{src: 'node_modules/@lrnwebcomponents/simple-icon/lib/svgs', dest: 'src/main/resources/resources/node_modules/@lrnwebcomponents/simple-icon/lib'}]),
			],
		}),
		modulepreload({
			prefix: '',
			index: 'src/main/resources/resources/index.html',
			shouldPreload,
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
