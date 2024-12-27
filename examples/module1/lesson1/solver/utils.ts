export type NumberCalculateFn = (a: number, b: number) => number;

export const add: NumberCalculateFn = (a, b) => a + b;
export const subtract: NumberCalculateFn = (a, b) => a - b;
export const multiply: NumberCalculateFn = (a, b) => a * b;
export const divide: NumberCalculateFn = (a, b) => a / b;
