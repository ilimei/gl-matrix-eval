import { Context, UnitType } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";

export class BinaryExpression extends Expression {
    op: string; // +-*/
    left: UnitType;
    right: UnitType;

    constructor(op: string, left: UnitType, right: UnitType) {
        super('BinaryExpression');
        this.op = op;
        this.left = left;
        this.right = right;
    }

    toNumberWrapper(ctx: Context): NumberWrapper {
        const left = this.left instanceof NumberWrapper ? this.left : this.left.toNumberWrapper(ctx);
        const right = this.right instanceof NumberWrapper ? this.right : this.right.toNumberWrapper(ctx);
        switch (this.op) {
            case '+':
                return left.add(right);
            case '-':
                return left.sub(right);
            case '*':
                return left.mul(right);
            case '/':
                return left.div(right);
        }
        throw new Error(`unexpected op ${this.op}`);
    }
}
