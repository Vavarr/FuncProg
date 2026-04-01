/**
 * Immutable state management for the calculator
 * Implements a pure reducer function for state transitions
 */

import { CalculatorState, Action, Operation } from '../types.js';
import { add, subtract, multiply, divide } from '../operations/arithmetic.js';
import { power, sqrt } from '../operations/advanced.js';

// Initial state - frozen to prevent mutations
export const initialState: CalculatorState = {
  display: '0',
  currentValue: null,
  previousValue: null,
  operation: null,
  shouldResetDisplay: false,
  history: Object.freeze([]),
  error: null
};

/**
 * Helper function to create a new state with immutable updates
 * @param state - Current state
 * @param updates - Partial state updates
 * @returns New state object
 */
const withState = <K extends keyof CalculatorState>(
  state: CalculatorState,
  updates: Pick<CalculatorState, K>
): CalculatorState => {
  return { ...state, ...updates };
};

/**
 * Handles digit input actions
 */
const handleDigitInput = (state: CalculatorState, digit: string): CalculatorState => {
  const currentDisplay = state.display;

  // If display should be reset, start fresh
  if (state.shouldResetDisplay) {
    return withState(state, {
      display: digit,
      shouldResetDisplay: false
    });
  }

  // Handle leading zero
  if (currentDisplay === '0' && digit !== '.') {
    return withState(state, { display: digit });
  }

  // Prevent multiple leading zeros
  if (currentDisplay === '0' && digit === '0') {
    return state;
  }

  // Append digit
  return withState(state, { display: currentDisplay + digit });
};

/**
 * Handles operator input actions
 */
const handleOperatorInput = (state: CalculatorState, operation: Operation): CalculatorState => {
  const { currentValue, display, error } = state;

  // Clear any previous error
  if (error) {
    return withState(state, {
      error: null,
      operation,
      currentValue: parseFloat(display),
      shouldResetDisplay: true
    });
  }

  // Parse current display value
  const newCurrentValue = parseFloat(display);

  // If there's an ongoing operation, calculate it first
  if (state.operation && currentValue !== null && !state.shouldResetDisplay) {
    try {
      const result = performOperation(state.operation, currentValue, newCurrentValue);
      return withState(state, {
        display: formatNumber(result),
        currentValue: result,
        previousValue: currentValue,
        operation,
        shouldResetDisplay: true,
        history: [...state.history, `${formatNumber(currentValue)} ${state.operation} ${formatNumber(newCurrentValue)} = ${formatNumber(result)}`]
      });
    } catch (err) {
      return withState(state, {
        error: err instanceof Error ? err.message : 'Unknown error',
        shouldResetDisplay: true
      });
    }
  }

  // Start new operation
  return withState(state, {
    operation,
    currentValue: newCurrentValue,
    previousValue: currentValue,
    shouldResetDisplay: true
  });
};

/**
 * Performs the actual calculation based on operation type
 */
const performOperation = (operation: Operation, a: number, b: number): number => {
  switch (operation) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '^':
      return power(a, b);
    case '√':
      // Square root is unary, but we handle it as binary for consistency
      // In this case, we ignore b and use a as the value
      return sqrt(a);
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
};

/**
 * Handles calculate action (equals button)
 */
const handleCalculate = (state: CalculatorState): CalculatorState => {
  const { operation, currentValue, display, error } = state;

  if (error) {
    return state;
  }

  if (!operation || currentValue === null) {
    return state;
  }

  try {
    const newValue = parseFloat(display);
    const result = performOperation(operation, currentValue, newValue);

    return withState(state, {
      display: formatNumber(result),
      currentValue: result,
      previousValue: currentValue,
      operation: null,
      shouldResetDisplay: true,
      history: [...state.history, `${formatNumber(currentValue)} ${operation} ${formatNumber(newValue)} = ${formatNumber(result)}`]
    });
  } catch (err) {
    return withState(state, {
      error: err instanceof Error ? err.message : 'Unknown error',
      shouldResetDisplay: true
    });
  }
};

/**
 * Handles clear action
 */
const handleClear = (_state: CalculatorState): CalculatorState => {
  return initialState;
};

/**
 * Handles toggle sign action (+/-)
 */
const handleToggleSign = (state: CalculatorState): CalculatorState => {
  const currentDisplay = state.display;
  if (currentDisplay === '0') return state;

  const newValue = parseFloat(currentDisplay) * -1;
  return withState(state, { display: formatNumber(newValue) });
};

/**
 * Handles add decimal point
 */
const handleAddDecimal = (state: CalculatorState): CalculatorState => {
  const currentDisplay = state.display;

  if (state.shouldResetDisplay) {
    return withState(state, {
      display: '0.',
      shouldResetDisplay: false
    });
  }

  if (!currentDisplay.includes('.')) {
    return withState(state, { display: currentDisplay + '.' });
  }

  return state;
};

/**
 * Handles backspace action
 */
const handleBackspace = (state: CalculatorState): CalculatorState => {
  const currentDisplay = state.display;

  if (state.shouldResetDisplay) {
    return state;
  }

  if (currentDisplay.length <= 1) {
    return withState(state, { display: '0' });
  }

  return withState(state, { display: currentDisplay.slice(0, -1) });
};

/**
 * Handles percentage action
 */
const handlePercentage = (state: CalculatorState): CalculatorState => {
  const currentDisplay = state.display;
  const value = parseFloat(currentDisplay);
  const result = value / 100;

  return withState(state, { display: formatNumber(result) });
};

/**
 * Formats a number for display, handling precision and edge cases
 */
const formatNumber = (value: number): string => {
  // Handle very large or very small numbers with exponential notation
  if (Math.abs(value) > 1e15 || (Math.abs(value) < 1e-10 && value !== 0)) {
    return value.toExponential(10);
  }

  // Round to avoid floating point precision issues
  const rounded = Math.round(value * 1e10) / 1e10;
  const str = rounded.toString();

  // Limit decimal places for display
  if (str.includes('.') && str.split('.')[1].length > 10) {
    return rounded.toFixed(10).replace(/\.?0+$/, '');
  }

  return str;
};

/**
 * Main reducer function - pure function that returns new state
 * @param state - Current state
 * @param action - Action to process
 * @returns New state
 */
export const reducer = (state: CalculatorState, action: Action): CalculatorState => {
  switch (action.type) {
    case 'INPUT_DIGIT':
      return handleDigitInput(state, action.payload.digit);

    case 'INPUT_OPERATOR':
      return handleOperatorInput(state, action.payload.operation);

    case 'CALCULATE':
      return handleCalculate(state);

    case 'CLEAR':
      return handleClear(state);

    case 'TOGGLE_SIGN':
      return handleToggleSign(state);

    case 'ADD_DECIMAL':
      return handleAddDecimal(state);

    case 'BACKSPACE':
      return handleBackspace(state);

    case 'PERCENTAGE':
      return handlePercentage(state);

    default:
      // Exhaustive type checking - this should never happen
      const _exhaustiveCheck: never = action;
      void _exhaustiveCheck;
      return state;
  }
};
