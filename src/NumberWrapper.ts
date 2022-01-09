// 被操作对象的包装

import { mat2, mat3, mat4, quat, quat2, vec2, vec3, vec4 } from "gl-matrix";
/**
 * 当前操作数的类型
 */
export type WrapType = 'vec2' | 'vec3' | 'vec4' | 'mat2' | 'mat3' | 'mat4' | 'quat' | 'quat2' | 'number';
/**
 * 当前操作数值类型
 */
export type ValueType = vec2 | vec3 | vec4 | mat2 | mat3 | mat4 | quat | quat2 | number;

/**
 * 操作类型封装
 */
export default class NumberWrapper {

    static fromKeyValue(key:string, value: ValueType) {
        if(typeof value === 'number') {
            return new NumberWrapper('number', value);
        } else if(value.length === 2) {
            return new NumberWrapper('vec2', value);
        } else if(value.length === 3) {
            return new NumberWrapper('vec3', value);
        } else if(value.length === 8) {
            return new NumberWrapper('quat2', value);
        } else if(value.length === 9) {
            return new NumberWrapper('mat3', value);
        } else if(value.length === 16) {
            return new NumberWrapper('mat4', value);
        } else if(value.length === 4) {
            if(key[0] === 'v') {
                return new NumberWrapper('vec4', value);
            } else if(key[0] === 'm') {
                return new NumberWrapper('mat2', value);
            } else if(key[0] === 'q') {
                return new NumberWrapper('quat', value);
            }
        }
        throw new Error(`cant identify ${key} type`);
    }

    constructor(private _type: WrapType, private _value: ValueType) { };

    get type() {
        return this._type;
    }

    get value() {
        return this._value;
    }

    add(value: NumberWrapper | ValueType): NumberWrapper {
        switch (this._type) {
            case 'number': {
                if (typeof value === 'number') {
                    return new NumberWrapper('number', this._value as number + value);
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', this._value as number + n);
                    }
                }
                throw new Error(`number cant add this value:${value}`);
            }
            case 'vec2': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec2', vec2.add(vec2.create(), this._value as vec2, vec2.fromValues(value, value)));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', vec2.add(vec2.create(), this._value as vec2, vec2.fromValues(n, n)));
                    } else if(value.type === 'vec2') {
                        return new NumberWrapper('vec2', vec2.add(vec2.create(), this._value as vec2, value.value as vec2));
                    }
                }
                throw new Error(`vec2 cant add this value:${value}`);
            }
            case 'vec3': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec3', vec3.add(vec3.create(), this._value as vec3, vec3.fromValues(value, value, value)));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec3', vec3.add(vec3.create(), this._value as vec3, vec3.fromValues(n, n, n)));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.add(vec3.create(), this._value as vec3, value.value as vec3));
                    }
                }
                throw new Error(`vec3 cant add this value:${value}`);
            }
            case 'vec4': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec4', vec4.add(vec4.create(), this._value as vec4, vec4.fromValues(value, value, value, value)));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec4', vec4.add(vec4.create(), this._value as vec4, vec4.fromValues(n, n, n, n)));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.add(vec4.create(), this._value as vec4, value.value as vec4));
                    }
                }
                throw new Error(`vec4 cant add this value:${value}`);
            }
            case 'mat2': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'mat2') {
                        return new NumberWrapper('mat2', mat2.add(mat2.create(), this._value as mat2, value.value as mat2));
                    }
                }
                throw new Error(`mat2 cant add this value:${value}`);
            }
            case 'mat3': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'mat3') {
                        return new NumberWrapper('mat3', mat3.add(mat3.create(), this._value as mat3, value.value as mat3));
                    }
                }
                throw new Error(`mat3 cant add this value:${value}`);
            }
            case 'mat4': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'mat4') {
                        return new NumberWrapper('mat4', mat4.add(mat4.create(), this._value as mat4, value.value as mat4));
                    }
                }
                throw new Error(`mat4 cant add this value:${value}`);
            }
            case 'quat': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'quat') {
                        return new NumberWrapper('quat', quat.add(quat.create(), this._value as quat, value.value as quat));
                    }
                }
                throw new Error(`quat cant add this value:${value}`);
            }
            case 'quat2': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'quat2') {
                        return new NumberWrapper('quat', quat2.add(quat2.create(), this._value as quat2, value.value as quat2));
                    }
                }
                throw new Error(`quat2 cant add this value:${value}`);
            }
        }
    }

    sub(value: NumberWrapper | ValueType): NumberWrapper {
        switch (this._type) {
            case 'number': {
                if (typeof value === 'number') {
                    return new NumberWrapper('number', this._value as number - value);
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', this._value as number - n);
                    }
                }
                throw new Error(`number cant sub this value:${value}`);
            }
            case 'vec2': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec2', vec2.sub(vec2.create(), this._value as vec2, vec2.fromValues(value, value)));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', vec2.sub(vec2.create(), this._value as vec2, vec2.fromValues(n, n)));
                    } else if(value.type === 'vec2') {
                        return new NumberWrapper('vec2', vec2.sub(vec2.create(), this._value as vec2, value.value as vec2));
                    }
                }
                throw new Error(`vec2 cant sub this value:${value}`);
            }
            case 'vec3': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec3', vec3.sub(vec3.create(), this._value as vec3, vec3.fromValues(value, value, value)));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec3', vec3.sub(vec3.create(), this._value as vec3, vec3.fromValues(n, n, n)));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.sub(vec3.create(), this._value as vec3, value.value as vec3));
                    }
                }
                throw new Error(`vec3 cant sub this value:${value}`);
            }
            case 'vec4': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec4', vec4.sub(vec4.create(), this._value as vec4, vec4.fromValues(value, value, value, value)));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec4', vec4.sub(vec4.create(), this._value as vec4, vec4.fromValues(n, n, n, n)));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.sub(vec4.create(), this._value as vec4, value.value as vec4));
                    }
                }
                throw new Error(`vec4 cant sub this value:${value}`);
            }
            case 'mat2': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'mat2') {
                        return new NumberWrapper('mat2', mat2.sub(mat2.create(), this._value as mat2, value.value as mat2));
                    }
                }
                throw new Error(`mat2 cant sub this value:${value}`);
            }
            case 'mat3': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'mat3') {
                        return new NumberWrapper('mat3', mat3.sub(mat3.create(), this._value as mat3, value.value as mat3));
                    }
                }
                throw new Error(`mat3 cant sub this value:${value}`);
            }
            case 'mat4': {
                if(value instanceof NumberWrapper) {
                     if(value.type === 'mat4') {
                        return new NumberWrapper('mat4', mat4.sub(mat4.create(), this._value as mat4, value.value as mat4));
                    }
                }
                throw new Error(`mat4 cant sub this value:${value}`);
            }
            default: 
                throw new Error(`${this._type} cant exec sub`);
        }
    }

    mul(value: NumberWrapper | ValueType): NumberWrapper {
        switch (this._type) {
            case 'number': {
                if (typeof value === 'number') {
                    return new NumberWrapper('number', this._value as number * value);
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', this._value as number * n);
                    }
                }
                throw new Error(`number cant mul this value:${value}`);
            }
            case 'vec2': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec2', vec2.scale(vec2.create(), this._value as vec2, value));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', vec2.scale(vec2.create(), this._value as vec2, n));
                    } else if(value.type === 'vec2') {
                        return new NumberWrapper('vec2', vec2.mul(vec2.create(), this._value as vec2, value.value as vec2));
                    }
                }
                throw new Error(`vec2 cant mul this value:${value}`);
            }
            case 'vec3': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec3', vec3.scale(vec3.create(), this._value as vec3, value));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec3', vec3.scale(vec3.create(), this._value as vec3, n));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.mul(vec3.create(), this._value as vec3, value.value as vec3));
                    }
                }
                throw new Error(`vec3 cant mul this value:${value}`);
            }
            case 'vec4': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec4', vec4.scale(vec4.create(), this._value as vec4, value));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec4', vec4.scale(vec4.create(), this._value as vec4, n));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.mul(vec4.create(), this._value as vec4, value.value as vec4));
                    }
                }
                throw new Error(`vec4 cant mul this value:${value}`);
            }
            case 'mat2': {
                if(value instanceof NumberWrapper) {
                    if(value.type === 'mat2') {
                        return new NumberWrapper('mat2', mat2.mul(mat2.create(), this._value as mat2, value.value as mat2));
                    }
                }
                throw new Error(`mat2 cant mul this value:${value}`);
            }
            case 'mat3': {
                if(value instanceof NumberWrapper) {
                    if(value.type === 'mat3') {
                        return new NumberWrapper('mat3', mat3.mul(mat3.create(), this._value as mat3, value.value as mat3));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.transformMat3(vec3.create(), value.value as vec3, this._value as mat3));
                    }
                }
                throw new Error(`mat3 cant mul this value:${value}`);
            }
            case 'mat4': {
                if(value instanceof NumberWrapper) {
                    if(value.type === 'mat4') {
                        return new NumberWrapper('mat4', mat4.mul(mat4.create(), this._value as mat4, value.value as mat4));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.transformMat4(vec3.create(), value.value as vec3, this._value as mat4));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.transformMat4(vec4.create(), value.value as vec4, this._value as mat4));
                    }
                }
                throw new Error(`mat4 cant mul this value:${value}`);
            }
            case 'quat': {
                if(value instanceof NumberWrapper) {
                    if(value.type === 'quat') {
                        return new NumberWrapper('quat', quat.mul(quat.create(), this._value as quat, value.value as quat));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.transformQuat(vec3.create(), value.value as vec3, this._value as quat));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.transformQuat(vec4.create(), value.value as vec4, this._value as quat));
                    }
                }
                throw new Error(`quat cant mul this value:${value}`);
            }
            case 'quat2': {
                if(value instanceof NumberWrapper) {
                    if(value.type === 'quat2') {
                        return new NumberWrapper('quat', quat2.mul(quat2.create(), this._value as quat2, value.value as quat2));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.transformQuat(vec3.create(), value.value as vec3, this._value as quat));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.transformQuat(vec4.create(), value.value as vec4, this._value as quat));
                    }
                }
                throw new Error(`quat2 cant mul this value:${value}`);
            }
        }
    }

    div(value: NumberWrapper | ValueType): NumberWrapper {
        switch (this._type) {
            case 'number': {
                if (typeof value === 'number') {
                    return new NumberWrapper('number', this._value as number / value);
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', this._value as number / n);
                    }
                }
                throw new Error(`number cant div this value:${value}`);
            }
            case 'vec2': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec2', vec2.scale(vec2.create(), this._value as vec2, 1 / value));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec2', vec2.scale(vec2.create(), this._value as vec2, 1 / n));
                    } else if(value.type === 'vec2') {
                        return new NumberWrapper('vec2', vec2.div(vec2.create(), this._value as vec2, value.value as vec2));
                    }
                }
                throw new Error(`vec2 cant div this value:${value}`);
            }
            case 'vec3': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec3', vec3.scale(vec3.create(), this._value as vec3, 1/value));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec3', vec3.scale(vec3.create(), this._value as vec3, 1/n));
                    } else if(value.type === 'vec3') {
                        return new NumberWrapper('vec3', vec3.div(vec3.create(), this._value as vec3, value.value as vec3));
                    }
                }
                throw new Error(`vec3 cant div this value:${value}`);
            }
            case 'vec4': {
                if (typeof value === 'number') {
                    return new NumberWrapper('vec4', vec4.scale(vec4.create(), this._value as vec4, 1/value));
                } else if(value instanceof NumberWrapper) {
                    if(value.type === 'number') {
                        const n = value.value as number;
                        return new NumberWrapper('vec4', vec4.scale(vec4.create(), this._value as vec4, 1/n));
                    } else if(value.type === 'vec4') {
                        return new NumberWrapper('vec4', vec4.div(vec4.create(), this._value as vec4, value.value as vec4));
                    }
                }
                throw new Error(`vec4 cant div this value:${value}`);
            }
            default:
                throw new Error(`${this._type} cant exec div`);
        }
    }
}
