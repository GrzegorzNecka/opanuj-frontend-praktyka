import Button from './components/Button';
import { MATH_OPERATIONS } from './mathOperations';
import { useCalculate } from './hooks/useCalculate';

export type CalculationResult = {
  result: number;
  error?: string;
};

// Could be split into separate components
const App = () => {
  const {
    firstInput,
    setFirstInput,
    secondInput,
    setSecondInput,
    result,
    setResult,
    error,
    calculateResult,
  } = useCalculate();

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={firstInput}
          onClick={(e) => {
            setResult(0);
            e.currentTarget.value === '0' && setFirstInput('');
          }}
          onChange={(e) => setFirstInput(e.currentTarget.value)}
        />
        <input
          type="number"
          className="rounded-md shadow-md p-4"
          value={secondInput}
          onClick={(e) => {
            setResult(0);
            e.currentTarget.value === '0' && setSecondInput('');
          }}
          onChange={(e) => setSecondInput(e.currentTarget.value)}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        {MATH_OPERATIONS.map((operation) => (
          <Button
            onClick={() => {
              calculateResult(operation);
              setFirstInput(0);
              setSecondInput(0);
            }}
          >
            {operation.symbol}
          </Button>
        ))}
      </div>
      <div>Result: {result}</div>
      <p>{error}</p>
    </div>
  );
};

export default App;
