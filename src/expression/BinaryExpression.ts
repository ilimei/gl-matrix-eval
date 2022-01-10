import { Context } from "../common";
import NumberWrapper from "../NumberWrapper";
import Expression from "./Expression";

export class BinaryExpression extends Expression {
    op: string; // +-*/
    left: Expression;
    right: Expression;
    ret: NumberWrapper;

    constructor(op: string, left: Expression, right: Expression) {
        super('BinaryExpression');
        this.op = op;
        this.left = left;
        this.right = right;
        this.ret = NumberWrapper.newEmpty();

        switch (this.op) {
            case '+':
                this.toNumberWrapper = ctx => {
                    const left =  this.left.toNumberWrapper(ctx);
                    const right = this.right.toNumberWrapper(ctx);
                    return left.add(right, this.ret);
                };
                break;
            case '-':
                this.toNumberWrapper = ctx => {
                    const left =  this.left.toNumberWrapper(ctx);
                    const right = this.right.toNumberWrapper(ctx);
                    return left.sub(right, this.ret);
                };
                break;
            case '*':
                this.toNumberWrapper = ctx => {
                    const left =  this.left.toNumberWrapper(ctx);
                    const right = this.right.toNumberWrapper(ctx);
                    return left.mul(right, this.ret);
                };
                break;
            case '/':
                this.toNumberWrapper = ctx => {
                    const left =  this.left.toNumberWrapper(ctx);
                    const right = this.right.toNumberWrapper(ctx);
                    return left.div(right, this.ret);
                };
                break;
        }
    }

    toNumberWrapper(_ctx: Context): NumberWrapper {
        throw new Error(`unexpected op ${this.op}`);
    }
}
