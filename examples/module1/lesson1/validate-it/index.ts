import { NumericValidationMethods } from './validation/methods';
import { validator } from './validation/validator';

function main() {
  const input: HTMLInputElement = document.querySelector('input')!;
  const validateButton: HTMLElement =
    document.getElementById('validateButton')!;
  const clearButton: HTMLElement = document.getElementById('clearButton')!;
  const result: HTMLElement = document.getElementById('result')!;

  if (!input || !validateButton || !clearButton || !result) {
    console.error('One or more elements not found');
    return;
  }

  validateButton.addEventListener('click', () => {
    const validationMessage = validator(input.value, NumericValidationMethods);
    result.innerHTML = validationMessage;
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

main();
