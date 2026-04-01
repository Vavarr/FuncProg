/**
 * Type definitions for the Functional Programming Calculator
 * All types are designed to enforce immutability and type safety
 */

// Operation type union - all supported operations
export type Operation = '+' | '-' | '*' | '/' | '^' | '√';

// Calculator state interface - fully immutable with readonly properties
export interface CalculatorState {
  readonly display: string;              // Current display value as string
  readonly currentValue: number | null;  // Stored numeric value (first operand)
  readonly previousValue: number | null; // Previous operand for binary operations
  readonly operation: Operation | null;  // Selected operation
  readonly shouldResetDisplay: boolean;  // Flag indicating next input should reset display
  readonly history: readonly string[];   // Immutable history of calculations
  readonly error: string | null;         // Error message if any
}

// Action discriminated union for type-safe state transitions
export type Action =
  | { type: 'INPUT_DIGIT'; payload: { digit: string } }
  | { type: 'INPUT_OPERATOR'; payload: { operation: Operation } }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'ADD_DECIMAL' }
  | { type: 'BACKSPACE' }
  | { type: 'PERCENTAGE' };

// Operation function signature for binary operations
export type OperationFunction = (a: number, b: number) => number;

// Unary operation signature (for square root)
export type UnaryOperation = (a: number) => number;

// Result wrapper for error handling using Option/Result pattern
export type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

// Event handler function type
export type EventHandler = (state: CalculatorState, payload?: any) => CalculatorState;

// Operation registry type - maps operation symbols to their functions
export type OperationRegistry = Record<Operation, OperationFunction | UnaryOperation>;

// Type guards for discriminating operation types

/**
 * Type guard to check if an operation is unary (square root)
 */
export const isUnaryOperation = (op: Operation): op is '√' => {
  return op === '√';
};

/**
 * Type guard to check if an operation is binary
 */
export const isBinaryOperation = (op: Operation): op is Exclude<Operation, '√'> => {
  return op !== '√';
};

/**
 * Type guard to check if an action is INPUT_DIGIT
 */
export const isInputDigitAction = (action: Action): action is { type: 'INPUT_DIGIT'; payload: { digit: string } } => {
  return action.type === 'INPUT_DIGIT';
};

/**
 * Type guard to check if an action is INPUT_OPERATOR
 */
export const isInputOperatorAction = (action: Action): action is { type: 'INPUT_OPERATOR'; payload: { operation: Operation } } => {
  return action.type === 'INPUT_OPERATOR';
};

/**
 * Type guard to check if an action is CALCULATE
 */
export const isCalculateAction = (action: Action): action is { type: 'CALCULATE' } => {
  return action.type === 'CALCULATE';
};
