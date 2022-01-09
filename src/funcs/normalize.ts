import { vec2, vec3, vec4 } from "gl-matrix";
import { MatrixExec } from "../MatrixExec";
import NumberWrapper from "../NumberWrapper";

MatrixExec.extend('normalize', (args: NumberWrapper[]) => {
    const [value] = args;
    switch (value.type) {
        case 'number':
            return new NumberWrapper('number', 1);
        case 'vec2':
            return new NumberWrapper('vec2', vec2.normalize(vec2.create(), value.value as vec2));
        case 'vec3':
            return new NumberWrapper('vec3', vec3.normalize(vec3.create(), value.value as vec3));
        case 'vec4':
            return new NumberWrapper('vec4', vec4.normalize(vec4.create(), value.value as vec4));
        default:
            throw new Error(`${value.type} cant normalize`);
    }
});
