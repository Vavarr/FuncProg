/**

 * Functional Programming Calculator - Core Module

 * Main entry point that exports all calculator functionality

 *

 * This module provides a complete functional programming calculator

 * with pure functions, immutable state, and type-safe operations.

 */
export * from './types.js';
export * from './operations/arithmetic.js';
export * from './operations/advanced.js';
export * from './state/reducer.js';
export * from './utils/higherOrder.js';
import { Operation, OperationRegistry, CalculatorState, Action } from './types.js';
/**

 * Central registry of all calculator operations

 * Maps operation symbols to their corresponding functions

 */
export declare const OPERATIONS: OperationRegistry;
/**

 * Get an operation function by its symbol

 * @param operation - The operation symbol

 * @returns The corresponding operation function or undefined

 */
export declare const getOperation: (operation: Operation) => OperationRegistry[Operation] | undefined;
/**

 * Calculator class - provides a functional interface to the calculator

 * This is a facade that wraps the pure functions in a convenient API

 */
export declare class Calculator {
    private state;
    constructor();
    /**
  
     * Gets the current state
  
     */
    getState(): CalculatorState;
    /**
  
     * Dispatches an action to the reducer
  
     * @param action - Action to dispatch
  
     */
    dispatch(action: Action): void;
    /**
  
     * Inputs a digit
  
     * @param digit - Digit to input (0-9)
  
     */
    inputDigit(digit: string): void;
    /**
  
     * Inputs an operator
  
     * @param operation - Operation to input
  
     */
    inputOperator(operation: Operation): void;
    /**
  
     * Performs calculation (equals)
  
     */
    calculate(): void;
    /**
  
     * Clears the calculator
  
     */
    clear(): void;
    /**
  
     * Toggles the sign of the current value
  
     */
    toggleSign(): void;
    /**
  
     * Adds a decimal point
  
     */
    addDecimal(): void;
    /**
  
     * Removes the last digit
  
     */
    backspace(): void;
    /**
  
     * Calculates percentage of current value
  
     */
    percentage(): void;
    /**
  
     * Executes an operation directly with two numbers
  
     * @param operation - Operation to perform
  
     * @param a - First number
  
     * @param b - Second number
  
     * @returns Result of the operation
  
     */
    executeOperation(operation: Operation, a: number, b: number): {
        success: boolean;
        value?: number;
        error?: string;
    };
}
export default Calculator;
//# sourceMappingURL=index.d.ts.map