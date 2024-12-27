import { useState } from 'react';
import type { NumberCalculateFn } from '../utils';

export const useCalculate = () => {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResult] = useState<number | string>(0);

  const calculate = (operation: NumberCalculateFn) => {
    setResult(operation(firstNumber, secondNumber));
    setFirstNumber(0);
    setSecondNumber(0);
  };

  const setFirst = (value: number) => {
    setFirstNumber(value);
  };

  const setSecond = (value: number) => {
    setSecondNumber(value);
  };

  return {
    firstNumber,
    secondNumber,
    result,
    setFirst,
    setSecond,
    calculate,
  };
};
