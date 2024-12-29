import { useState } from 'react';
import type { CalculationResult } from '../App';

export const useCalculate = () => {
  const [firstInput, setFirstInput] = useState<number | string>(0);
  const [secondInput, setSecondInput] = useState<number | string>(0);
  const [result, setResult] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const calculateResult = (
    func: (a: number, b: number) => CalculationResult
  ) => {
    const first =
      typeof firstInput === 'string' ? parseInputValue(firstInput) : firstInput;
    const second =
      typeof secondInput === 'string'
        ? parseInputValue(secondInput)
        : secondInput;

    const { error, result } = func(first, second);

    setResult(result);
    setError(error || '');
  };

  const parseInputValue = (value: string): number => {
    return value === '' ? 0 : parseFloat(value);
  };

  return {
    firstInput,
    setFirstInput,
    secondInput,
    setSecondInput,
    result,
    setResult,
    error,
    calculateResult,
  };
};
