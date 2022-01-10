import { vec2, vec3, vec4 } from "gl-matrix";
import { MatrixEval } from "../MatrixEval";
import NumberWrapper from "../NumberWrapper";

MatrixEval.extend('cross', (args: NumberWrapper[], ret: NumberWrapper) => {
    const [a, b, c] = args;
    switch (a.type) {
        case 'vec2':
            if(b?.type !== 'vec2') {
                throw new Error(`${a.type} cant cross ${b.type}`);
            }
            return ret.set('vec3', vec2.cross(vec3.create(), a.value as vec2, b.value as vec2));
        case 'vec3':
            if(b?.type !== 'vec3') {
                throw new Error(`${a.type} cant cross ${b.type}`);
            }
            return ret.set('vec3', vec3.cross(vec3.create(), a.value as vec3, b.value as vec3));
        case 'vec4':
            if(b?.type !== 'vec4' && c?.type !== 'vec4') {
                throw new Error(`${a.type} cant cross ${b.type}`);
            }
            return ret.set('vec4', vec4.cross(vec4.create(), a.value as vec4, b.value as vec4, c.value as vec4));
        default:
            throw new Error(`${a.type} cant normalize`);
    }
});
