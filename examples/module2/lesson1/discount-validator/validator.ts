export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  if (!firstName) {
    errors.push('First name is required');
  }

  if (!firstName.length) {
    errors.push('First name have to be longer than 0');
  }

  if (!lastName) {
    errors.push('Last name is required');
  }

  if (!lastName.length) {
    errors.push('Last name have to be longer than 0');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  if (typeof age !== 'number') {
    errors.push('Age must be a number');
  }

  return errors;
}
