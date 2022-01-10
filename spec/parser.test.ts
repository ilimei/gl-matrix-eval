import { BinaryExpression } from '../src/expression/BinaryExpression';
import { getTokens, parseTokens } from '../src/parser';

const tokenTypes = [
    'identify', 'operation',
    'braceStart', 'identify',
    'braceStart', 'identify',
    'braceStart', 'identify',
    'braceEnd', 'comma',
    'identify', 'braceEnd',
    'operation', 'number',
    'braceEnd', 'operation',
    'identify'
];

const tokenValues = [
    'a', '+',
    '(', 'normalize',
    '(', 'normalize',
    '(', 'b',
    ')', ',',
    'd', ')',
    '+', 2,
    ')', '*',
    'c'
];

describe('test parser', () => {
    test('test getTokens', () => {
        const tokens = getTokens('a + (normalize(normalize(b), d) + 2.0) * c');
        expect(tokens.length).toBe(17);
        for (let i = 0; i < tokens.length; i++) {
            expect(tokens[i].type).toBe(tokenTypes[i]);
            expect(tokens[i].value).toBe(tokenValues[i]);
        }
    });

    test('test parseTokens', () => {
        const tokens = getTokens('a + (normalize(normalize(b), d) + 2.0) * c');
        const expr = parseTokens(tokens);
        expect(expr.type === 'BinaryExpression').toBe(true);
        const binExpr = expr as BinaryExpression;
        expect(binExpr.left.type).toBe('IdentifyExpression');
        expect(binExpr.right.type).toBe('BinaryExpression');
    });
});
