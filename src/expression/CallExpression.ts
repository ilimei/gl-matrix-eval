import { Context } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";
import { IdentifyExpression } from "./IdentifyExpression";

export class CallExpression extends Expression {
    callee: IdentifyExpression;
    args: Expression[] = [];
    ret: NumberWrapper;

    constructor(callee: IdentifyExpression) {
        super('CallExpression');
        this.callee = callee;
        this.ret = NumberWrapper.newEmpty();
    }

    addParam(param: Expression) {
        this.args.unshift(param);
    }

    toNumberWrapper(ctx: Context) {
        const func = this.callee.toFunc(ctx);
        return func(this.args.map(v => {
            return v.toNumberWrapper(ctx);
        }), this.ret)
    }
}
