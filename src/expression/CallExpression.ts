import { Context, UnitType } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";
import { IdentifyExpression } from "./IdentifyExpression";

export class CallExpression extends Expression {
    callee: IdentifyExpression;
    args: UnitType[] = [];

    constructor(callee: IdentifyExpression) {
        super('CallExpression');
        this.callee = callee;
    }

    addParam(param: UnitType) {
        this.args.unshift(param);
    }

    toNumberWrapper(ctx: Context) {
        const func = this.callee.toFunc(ctx);
        return func(this.args.map(v => {
            return v instanceof NumberWrapper ? v : v.toNumberWrapper(ctx);
        }))
    }
}
