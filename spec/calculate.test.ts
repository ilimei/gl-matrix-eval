import { mat4, vec2, vec3, vec4 } from 'gl-matrix';
import MatrixEval from '../src/index';

describe('test calculate', () => {
    test('number calculate', () => {
        expect(new MatrixEval('1+2').exec()).toBe(3);
        expect(new MatrixEval('1+2*4').exec()).toBe(9);
        expect(new MatrixEval('(1+2)*4').exec()).toBe(12);
    });

    test('vec calculate', () => {
        const e = new MatrixEval('va+vb*3');
        expect(vec2.equals(e.exec({
            va: vec2.fromValues(1, 2),
            vb: vec2.fromValues(2, 1)
        }) as vec2, vec2.fromValues(1 + 2 * 3, 2 + 1 * 3))).toBe(true);
        expect(vec3.equals(e.exec({
            va: vec3.fromValues(1, 2, 3),
            vb: vec3.fromValues(2, 1, 3)
        }) as vec3, vec3.fromValues(1 + 2 * 3, 2 + 1 * 3, 3 + 3 * 3))).toBe(true);
        expect(vec4.equals(e.exec({
            va: vec4.fromValues(1, 2, 3, 4),
            vb: vec4.fromValues(2, 1, 3, 6)
        }) as vec4, vec4.fromValues(1 + 2 * 3, 2 + 1 * 3, 3 + 3 * 3, 4 + 6 * 3))).toBe(true);
    });

    test('mat calculate', () => {
        const e = new MatrixEval('m * v');

        const trans = mat4.create();
        mat4.scale(trans, trans, [0.5, 0.5, 0.5]);

        expect(vec3.equals(e.exec({
            m: trans,
            v: vec3.fromValues(2, 1, 3)
        }) as vec3, [1, 0.5, 1.5])).toBe(true);
        expect(vec4.equals(e.exec({
            v: [1, 2, 3, 4],
            m: trans
        }) as vec4, [0.5, 1, 1.5, 4])).toBe(true);
    });
});
