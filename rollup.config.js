import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
    entry: 'src/index.js',
    output: [
        {
            file: './dist/selection.umd.js',
            format: 'umd',
            name: 'selection'
        },
        {
            file: './dist/selection.min.js',
            format: 'cjs'
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        uglify({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                reduce_funcs: false
            },
            mangle: {
                toplevel: true
            }
        }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [['env', { modules: false }]],
            plugins: ['external-helpers']
        })
    ],
    external: []
}
