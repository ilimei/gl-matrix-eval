import Expression from "./expression/Expression";
import NumberWrapper from "./NumberWrapper";

export interface Token {
    type: 'operation' | 'braceStart' | 'braceEnd' | 'comma' | 'identify' | 'number' | 'funcCall',
    value: string | number;
}

export type NumberWrapFunc = (a: NumberWrapper[]) => NumberWrapper;
export type Context = { [key: string]: NumberWrapper | NumberWrapFunc }

export type UnitType = Expression | NumberWrapper;