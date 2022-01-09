import { getTokens } from '../src/parser';

describe('test parser', () => {
    test('test getTokens', () => {
        const tokens = getTokens('1');
        expect(tokens.length).toBe(1);
        expect(tokens[0].type).toBe('number');
    });
});
