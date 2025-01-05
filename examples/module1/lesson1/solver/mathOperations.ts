import type { CalculationResult } from './App';

export function add(addend1: number, addend2: number): CalculationResult {
  return { result: addend1 + addend2 };
}
add.symbol = '+';

export function subtract(
  minuend: number,
  subtrahend: number
): CalculationResult {
  return { result: minuend - subtrahend };
}
subtract.symbol = '-';

export function multiply(factor1: number, factor2: number): CalculationResult {
  return { result: factor1 * factor2 };
}
multiply.symbol = '*';

export function divide(dividend: number, divisor: number): CalculationResult {
  return {
    result: dividend / divisor,
    error: divisor === 0 ? 'Cannot divide by zero' : undefined,
  };
}
divide.symbol = '/';

export const MATH_OPERATIONS = [add, subtract, multiply, divide];
