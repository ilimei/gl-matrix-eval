import { Context, NumberWrapFunc } from "./common";
import Expression from "./expression/Expression";
import NumberWrapper, { ValueType } from "./NumberWrapper";
import { getTokens, parseTokens } from "./parser";

export class MatrixEval {

    static ctx: Context = {};

    static extend(funcName: string, func: NumberWrapFunc) {
        MatrixEval.ctx[funcName] = func;
    }

    _root: Expression;

    constructor(exprStr: string) {
        const tokens = getTokens(exprStr);
        this._root = parseTokens(tokens);
    }

    exec(values: {
        [key: string]: ValueType;
    } = {}): ValueType {
        const ctx = { ...MatrixEval.ctx };
        Object.keys(values).forEach(key => {
            const value = values[key];
            ctx[key] = NumberWrapper.fromKeyValue(key, value);
        });
        return this._root.toNumberWrapper(ctx).value;
    }

    toTree() {
        return JSON.stringify(this._root, null, 4);
    }
}
