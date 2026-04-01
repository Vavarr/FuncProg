/**
 * Immutable state management for the calculator
 * Implements a pure reducer function for state transitions
 */
import { CalculatorState, Action } from '../types.js';
export declare const initialState: CalculatorState;
/**
 * Main reducer function - pure function that returns new state
 * @param state - Current state
 * @param action - Action to process
 * @returns New state
 */
export declare const reducer: (state: CalculatorState, action: Action) => CalculatorState;
//# sourceMappingURL=reducer.d.ts.map