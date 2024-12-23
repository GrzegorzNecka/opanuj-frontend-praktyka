export function validator(value: string) {
  const isIntiger = (value: string) => {
    return !isNaN(Number(value)) && Number.isInteger(Number(value));
  };

  const isLessThan = (value: string, max = 100) => {
    return Number(value) < max;
  };

  const isGreaterThan = (value: string, min = 0) => {
    return Number(value) > min;
  };

  const isEven = (value: string) => {
    return Number(value) % 2 === 0;
  };

  const methods = [isIntiger, isLessThan, isGreaterThan, isEven];

  if (!isIntiger(value)) {
    return 'Invalid';
  }

  const isValid = methods.every((method) => method(value));

  if (isValid) {
    return 'Valid';
  }

  return 'Invalid';
}
