import { vec2, vec3, vec4 } from "gl-matrix";
import { MatrixEval } from "../MatrixEval";
import NumberWrapper from "../NumberWrapper";

MatrixEval.extend('normalize', (args: NumberWrapper[], ret: NumberWrapper) => {
    const [value] = args;
    switch (value.type) {
        case 'number':
            return ret.set('number', 1);
        case 'vec2':
            return ret.set('vec2', vec2.normalize(vec2.create(), value.value as vec2));
        case 'vec3':
            return ret.set('vec3', vec3.normalize(vec3.create(), value.value as vec3));
        case 'vec4':
            return ret.set('vec4', vec4.normalize(vec4.create(), value.value as vec4));
        default:
            throw new Error(`${value.type} cant normalize`);
    }
});
