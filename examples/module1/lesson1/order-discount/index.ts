import { NumericValidationMethods } from './validation/methods';
import { validator } from './validation/validator';

function main() {
  const input: HTMLInputElement = document.querySelector('#input')!;
  const validateButton: HTMLElement =
    document.querySelector('#validation-btn')!;
  const clearInputButton: HTMLElement = document.querySelector('#cleanup-btn')!;
  const result: HTMLElement = document.querySelector('#result')!;

  if (!input || !validateButton || !clearInputButton || !result) {
    console.error('One or more elements not found');
    return;
  }

  validateButton.addEventListener('click', () => {
    const validationMessage = validator(input.value, NumericValidationMethods);
    result.innerHTML = validationMessage;
  });

  clearInputButton.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

main();
