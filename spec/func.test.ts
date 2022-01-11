import { mat4, vec2, vec3, vec4 } from 'gl-matrix';
import MatrixEval from '../src/index';

describe('test func', () => {

    test('test normalize', () => {
        const e = new MatrixEval('normalize(v1)*3');
        const minDelta = 0.000001;

        expect(vec2.len(e.exec({
            v1: vec2.fromValues(Math.random() * 10, Math.random() * 10)
        }) as vec2) - 3.0 < minDelta).toBe(true);
        expect(vec3.len(e.exec({
            v1: vec3.fromValues(Math.random() * 10, Math.random() * 10, Math.random() * 10)
        }) as vec3) - 3.0 < minDelta).toBe(true);
        expect(vec4.len(e.exec({
            v1: vec4.fromValues(Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 10)
        }) as vec4) - 3.0 < minDelta).toBe(true);
    });

    test('test cross', () => {
        const e = new MatrixEval('normalize(cross(v1, v2))');
        expect(vec3.equals(e.exec({
            v1: [11, 2],
            v2: [0, 2],
        }) as vec3, [0, 0, 1])).toBe(true);
        expect(vec3.equals(e.exec({
            v2: [11, 2],
            v1: [0, 2],
        }) as vec3, [0, 0, -1])).toBe(true);
    });
});
