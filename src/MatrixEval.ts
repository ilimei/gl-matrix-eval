import { Context, NumberWrapFunc } from "./common";
import Expression from "./expression/Expression";
import NumberWrapper, { ValueType } from "./NumberWrapper";
import { getTokens, parseTokens } from "./parser";

export class MatrixEval implements Context{

    static funcs: { [key: string]: NumberWrapFunc } = {};

    static extend(funcName: string, func: NumberWrapFunc) {
        MatrixEval.funcs[funcName] = func;
    }

    _root: Expression;
    _values: { [key: string]: ValueType; };

    constructor(exprStr: string) {
        const tokens = getTokens(exprStr);
        this._root = parseTokens(tokens);
    }

    getNumberWrapper(key: string): NumberWrapper {
        const value = this._values[key];
        if (value) {
            return NumberWrapper.fromKeyValue(key, value);
        }
        throw new Error(`undefined ${key}`);
    }

    getNumberWrapperFunc(key: string): NumberWrapFunc {
        const func = MatrixEval.funcs[key];
        if (func) {
            return func as NumberWrapFunc;
        }
        throw new Error(`undefined function ${key}`);
    }

    exec(values: {
        [key: string]: ValueType;
    } = {}): ValueType {
        this._values = values;
        return this._root.toNumberWrapper(this).value;
    }

    toTree() {
        return JSON.stringify(this._root, null, 4);
    }
}
