import { Context } from "../common";

export default class Expression {
    type: string;
    constructor(type: string) {
        this.type = type;
    }

    toNumberWrapper(_ctx: Context) {
        return null;
    }
};
