import { Context } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";

export class LiteralExpression extends Expression {
    num: NumberWrapper;

    constructor(num: NumberWrapper) {
        super('LiteralExpression');
        this.num = num;
    }

    toNumberWrapper(_ctx: Context): NumberWrapper {
        return this.num;
    }
}
