import { validator } from './validation/validator';

function main() {
  const input: HTMLInputElement = document.querySelector('input')!;
  const validateButton: HTMLElement =
    document.getElementById('validateButton')!;
  const clearButton: HTMLElement = document.getElementById('clearButton')!;
  const result: HTMLElement = document.getElementById('result')!;

  validateButton.addEventListener('click', () => {
    const validationMessage = validator(input.value);
    result.innerHTML = validationMessage;
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
  });
}

main();
