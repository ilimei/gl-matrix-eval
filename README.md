# glMartixExec

[![NPM Version](https://img.shields.io/npm/v/gl-matrix-eval.svg)](https://www.npmjs.com/package/gl-matrix-eval)

glMatrix calculate library, use eval replace with func call

```js
import MatrixExec from 'gl-matrix-eval';
import {vec2, vec3} from 'gl-matrix';

const add = new MatrixExec('v1 + v2');

console.info(add.exec({
    v1: vec2.fromValues(1, 2),
    v2: vec2.fromValues(2, 3),
})); // return vec2(3, 4);

console.info(add.exec({
    v1: vec3.fromValues(1, 2, 3),
    v2: vec3.fromValues(2, 3, 4),
})); // return vec3(3, 4, 7);
```
