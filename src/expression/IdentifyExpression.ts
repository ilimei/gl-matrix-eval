import { Context, Token } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";

export class IdentifyExpression extends Expression {
    token: Token;

    constructor(token: Token) {
        super('IdentifyExpression');
        this.token = token;
    }

    toNumberWrapper(ctx: Context): NumberWrapper {
        if(!ctx[this.token.value]) {
            throw new Error(`undefined ${this.token.value}`)
        }
        return ctx[this.token.value] as NumberWrapper;
    }

    toFunc(ctx: Context): (a: NumberWrapper[]) => NumberWrapper {
        if(!ctx[this.token.value]) {
            throw new Error(`undefined ${this.token.value}`)
        }
        return ctx[this.token.value] as (a: NumberWrapper[]) => NumberWrapper;
    }
}
