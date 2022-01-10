import MatrixEval from '../src/index';

describe('test calculate', () => {
    test('number calculate', () => {
        expect(new MatrixEval('1+2').exec()).toBe(3);
        expect(new MatrixEval('1+2*4').exec()).toBe(9);
        expect(new MatrixEval('(1+2)*4').exec()).toBe(12);
    });
});
