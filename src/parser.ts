import { Token } from "./common";
import { BinaryExpression } from "./expression/BinaryExpression";
import { CallExpression } from "./expression/CallExpression";
import Expression from "./expression/Expression";
import { IdentifyExpression } from "./expression/IdentifyExpression";
import { LiteralExpression } from "./expression/LiteralExpression";
import NumberWrapper from "./NumberWrapper";

const MATCH_INT_NUMBER = /0[xob][\da-fA-F]+?(\D|$)/;
const MATCH_FLOAT_NUMBER = /\d+\.?\d*(\D|$)/;
const MATCH_IDENTIFY = /\w+?(\W|$)/;
const EOF = '\0';

const FUNC_EXPRESSION = new Expression('funcCall');
const FUNC_TOKEN: Token = { type: 'funcCall', value: '' };

function readNumber(expr: string, i: number) {
    if (expr[i] === '0') {
        const integer = expr.slice(i).match(MATCH_INT_NUMBER);
        if (integer) {
            const value = integer[0].slice(0, -1);
            return [parseInt(value), value.length];
        }
    }
    const floatValue = expr.slice(i).match(MATCH_FLOAT_NUMBER);
    if (floatValue) {
        const value = floatValue[0].slice(0, -1);
        return [parseFloat(value), value.length];
    }
    throw new Error('read number error');
}

function readIdentify(expr: string, i: number) {
    const identify = expr.slice(i).match(MATCH_IDENTIFY);
    if (identify) {
        return identify[0].slice(0, -1);
    }
    throw new Error('read identify error');
}

export function getTokens(expr: string) {
    const tokens: Token[] = [];
    // 加入EOF字符
    expr = expr.trim() + EOF;
    let i = 0;
    while (i < expr.length) {
        const ch = expr[i];
        if (ch === EOF) {
            break;
        }
        do {
            if (/\s/.test(ch)) {
                break;
            }
            if ('+-*/'.includes(ch)) {
                tokens.push({
                    type: 'operation',
                    value: ch,
                });
                break;
            }
            if (ch === '(') {
                tokens.push({
                    type: 'braceStart',
                    value: ch,
                });
                break;
            }
            if (ch === ')') {
                tokens.push({
                    type: 'braceEnd',
                    value: ch,
                });
                break;
            }
            if (ch === ',') {
                tokens.push({
                    type: 'comma',
                    value: ch,
                });
                break;
            }
            if (/\d/.test(ch)) {
                // readNumber
                const [value, len] = readNumber(expr, i);
                i += len - 1;
                tokens.push({
                    type: 'number',
                    value,
                });
                break;
            }
            if (/[a-zA-Z_]/.test(ch)) {
                // readIdentify
                const value = readIdentify(expr, i);
                i += value.length - 1;
                tokens.push({
                    type: 'identify',
                    value,
                });
                continue;
            }
            throw new Error(`unexpected ch ${ch} at column ${i}`);
        } while (false);
        i++;
    }
    return tokens;
}

export function parseTokens(tokens: Token[]) {
    const opStack: Token[] = [];
    const valueStack: Expression[] = [];
    const callStack: CallExpression[] = [];

    const popOp = () => {
        const tk = opStack.pop();
        const right = valueStack.pop();
        const left = valueStack.pop();
        if (!tk || !left || !right) {
            throw new Error('unexpected');
        }
        valueStack.push(new BinaryExpression(tk.value as string, left, right));
    };

    let preTk: Token = null;
    for (const tk of tokens) {
        switch (tk.type) {
            case 'comma': {
                let topTk = opStack[opStack.length - 1];
                while (topTk && topTk.type !== 'funcCall') {
                    popOp();
                    topTk = opStack[opStack.length - 1];
                }
                break;
            }
            case 'number': {
                valueStack.push(new LiteralExpression(new NumberWrapper('number', tk.value as number)));
                break;
            }
            case 'identify': {
                valueStack.push(new IdentifyExpression(tk));
                break;
            }
            case 'operation': {
                const topTk = opStack[opStack.length - 1];
                if (!topTk || topTk.type === 'braceStart' || topTk.type === 'funcCall') {
                    opStack.push(tk);
                } else if (topTk.type === 'operation') {
                    if ('+-'.includes(tk.value as string)) {
                        popOp();
                    } else if ('*/'.includes(topTk.value as string)) {
                        popOp();
                    }
                    opStack.push(tk);
                } else {
                    throw new Error(`unexpected operation ${tk.value}`)
                }
                break;
            }
            case 'braceStart': {
                if (preTk?.type === 'identify') { // 函数调用
                    const call = new CallExpression(valueStack.pop() as IdentifyExpression);
                    callStack.push(call);
                    valueStack.push(FUNC_EXPRESSION);
                    opStack.push(FUNC_TOKEN);
                } else {
                    opStack.push(tk);
                }
                break;
            }
            case 'braceEnd': {
                let topTk = opStack[opStack.length - 1];
                while (topTk && topTk.type !== 'braceStart' && topTk.type !== 'funcCall') {
                    popOp();
                    topTk = opStack[opStack.length - 1];
                }
                if(!topTk) {
                    throw new Error(`unexpected`);
                }
                if (topTk.type === 'funcCall') {
                    let value = valueStack[valueStack.length - 1];
                    const call = callStack.pop();
                    while (value && value !== FUNC_EXPRESSION) {
                        call.addParam(value as Expression);
                        valueStack.pop();
                        value = valueStack[valueStack.length - 1];
                    }
                    if(!value) {
                        throw new Error('unexpected');
                    }
                    opStack.pop();
                    valueStack.pop();
                    valueStack.push(call);
                } else {
                    opStack.pop();
                }
                break;
            }
        }
        preTk = tk;
    }
    while (opStack.length) {
        popOp();
    }
    return valueStack.pop() as Expression;
}
