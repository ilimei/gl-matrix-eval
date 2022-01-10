import NumberWrapper from "./NumberWrapper";

export interface Token {
    type: 'operation' | 'braceStart' | 'braceEnd' | 'comma' | 'identify' | 'number' | 'funcCall',
    value: string | number;
}

export type NumberWrapFunc = (a: NumberWrapper[], ret: NumberWrapper) => NumberWrapper;
export type Context = {
    getNumberWrapper: (key: string) => NumberWrapper;
    getNumberWrapperFunc: (key: string) => NumberWrapFunc;
}
