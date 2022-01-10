import fs from 'fs';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import dts from "rollup-plugin-dts";
import { terser } from 'rollup-plugin-terser';
// import { sizeSnapshot } from 'rollup-plugin-size-snapshot';


const { version } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)));
const input = './src/index.ts';
const name = 'glMatrixEval';
const extensions = ['.js', '.ts'];
const external = ['gl-matrix'];
const globals = { 'gl-matrix': 'glMatrix' };
const babelHelpers = "bundled";

const bannerPlugin = {
    banner: `/*!
  @fileoverview gl-matrix-eval
  @author Hugehard Zhang
  @version ${version}
  */`
}

export default [
    {
        input,
        output: { file: 'dist/index.d.ts', format: 'es', name },
        plugins: [dts()]
    },
    {
        input,
        external,
        output: { file: 'dist/index.js', format: 'umd', name, globals },
        plugins: [
            bannerPlugin,
            nodeResolve({
                extensions,
            }),
            babel({ extensions, babelHelpers })
        ]
    },
    {
        input,
        external,
        output: { file: 'dist/index.min.js', format: 'umd', name, globals },
        plugins: [
            bannerPlugin,
            nodeResolve({
                extensions,
            }),
            babel({ extensions, babelHelpers }),
            terser({
                output: { comments: /^!/ }
            })
        ]
    }
];
