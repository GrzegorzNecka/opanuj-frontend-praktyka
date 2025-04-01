import {
  MESSAGE_ERROR_VALID_INPUT,
  MESSAGE_ERROR_VALID_INT,
  MESSAGE_SUCCESS_VALID_INT,
} from './messages';
import { type NumericValidationMethod, isValidIntiger } from './methods';

export function validator(
  input: string,
  validators: NumericValidationMethod[]
) {
  if (!isValidIntiger(input)) {
    return MESSAGE_ERROR_VALID_INPUT;
  }

  const isValid = validators.every((validatorFn) => validatorFn(Number(input)));

  if (isValid) {
    return MESSAGE_SUCCESS_VALID_INT;
  }

  return MESSAGE_ERROR_VALID_INT;
}
