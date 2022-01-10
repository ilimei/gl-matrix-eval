import { suite, FORMAT_MD } from "@thi.ng/bench";
import MatrixEval from '../src';
import { vec3 } from 'gl-matrix';

const a = vec3.fromValues(0, 0, 0);
const b = vec3.fromValues(1, 1, 1);
const me = new MatrixEval('a+b');

const args ={
    a, b
};

suite([
    { title: "gl-matrix", fn: () => vec3.add(vec3.create(), a, b) },
    {
        title: "gl-matrix-eval", fn: () => me.exec(args),
    },
], { iter: 10, size: 100000, warmup: 5, format: FORMAT_MD })
