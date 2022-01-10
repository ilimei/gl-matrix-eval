import { Context } from "../common";
import Expression from "./Expression";
import { IdentifyExpression } from "./IdentifyExpression";

export class CallExpression extends Expression {
    callee: IdentifyExpression;
    args: Expression[] = [];

    constructor(callee: IdentifyExpression) {
        super('CallExpression');
        this.callee = callee;
    }

    addParam(param: Expression) {
        this.args.unshift(param);
    }

    toNumberWrapper(ctx: Context) {
        const func = this.callee.toFunc(ctx);
        return func(this.args.map(v => {
            return v.toNumberWrapper(ctx);
        }))
    }
}
