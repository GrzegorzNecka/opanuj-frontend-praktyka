import React from 'react';
import { useCalculate } from './hooks/useCalculate';
import { add, subtract, multiply, divide } from './utils';
import Button from './components/Button';
import NumberInput from './components/NumberInput';

const App = () => {
  const { firstNumber, secondNumber, result, setFirst, setSecond, calculate } =
    useCalculate();

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <NumberInput value={firstNumber} onChange={setFirst} />
        <NumberInput value={secondNumber} onChange={setSecond} />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <Button onClick={() => calculate(add)}>+</Button>
        <Button onClick={() => calculate(subtract)}>-</Button>
        <Button onClick={() => calculate(multiply)}>*</Button>
        <Button onClick={() => calculate(divide)}>/</Button>
      </div>
      <div>Result: {result}</div>
    </div>
  );
};

export default App;
