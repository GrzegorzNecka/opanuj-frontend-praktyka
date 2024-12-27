export type NumericValidationMethod = (
  input: number,
  max?: number,
  min?: number
) => boolean;

export type StringValidationMethod = (input: string) => boolean;

export const isValidIntiger: StringValidationMethod = (input: string) => {
  return !isNaN(Number(input)) && Number.isInteger(Number(input));
};

const isValidLessThan: NumericValidationMethod = (input: number, max = 100) => {
  return Number(input) < max;
};

const isValidGreaterThan: NumericValidationMethod = (
  input: number,
  min = 0
) => {
  return Number(input) > min;
};

const isValidEven: NumericValidationMethod = (input: number) => {
  return input % 2 === 0;
};

export const NumericValidationMethods = [
  isValidLessThan,
  isValidGreaterThan,
  isValidEven,
];
