import { Context, NumberWrapFunc, Token } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";

export class IdentifyExpression extends Expression {
    token: Token;

    constructor(token: Token) {
        super('IdentifyExpression');
        this.token = token;
    }

    toNumberWrapper(ctx: Context): NumberWrapper {
        return ctx.getNumberWrapper(this.token.value as string);
    }

    toFunc(ctx: Context): NumberWrapFunc {
        return ctx.getNumberWrapperFunc(this.token.value as string);
    }
}
