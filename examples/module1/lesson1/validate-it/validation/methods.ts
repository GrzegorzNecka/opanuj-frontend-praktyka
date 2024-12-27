export type NumericValidationMethod = (
  input: number,
  boundary?: number
) => boolean;

export type StringValidationMethod = (input: string) => boolean;

export const isValidIntiger: StringValidationMethod = (input: string) => {
  return input != '' && Number.isInteger(Number(input));
};

const isValidLessThan: NumericValidationMethod = (
  input: number,
  boundary = 100
) => {
  return Number(input) < boundary;
};

const isValidGreaterThan: NumericValidationMethod = (
  input: number,
  boundary = 0
) => {
  return Number(input) > boundary;
};

const isValidEven: NumericValidationMethod = (input: number) => {
  return input % 2 === 0;
};

export const NumericValidationMethods = [
  isValidLessThan,
  isValidGreaterThan,
  isValidEven,
];
