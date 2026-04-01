/**

 * Functional Programming Calculator - Core Module

 * Main entry point that exports all calculator functionality

 *

 * This module provides a complete functional programming calculator

 * with pure functions, immutable state, and type-safe operations.

 */



// Export types

export * from './types.js';



// Export arithmetic operations

export * from './operations/arithmetic.js';



// Export advanced operations

export * from './operations/advanced.js';



// Export state management

export * from './state/reducer.js';



// Export higher-order functions

export * from './utils/higherOrder.js';



// Central operation registry

import { Operation, OperationRegistry, CalculatorState, Action } from './types.js';

import { add, subtract, multiply, divide } from './operations/arithmetic.js';

import { power, sqrt } from './operations/advanced.js';

import { initialState, reducer } from './state/reducer.js';



/**

 * Central registry of all calculator operations

 * Maps operation symbols to their corresponding functions

 */

export const OPERATIONS: OperationRegistry = {

  '+': add,

  '-': subtract,

  '*': multiply,

  '/': divide,

  '^': power,

  '√': sqrt

};



/**

 * Get an operation function by its symbol

 * @param operation - The operation symbol

 * @returns The corresponding operation function or undefined

 */

export const getOperation = (operation: Operation): OperationRegistry[Operation] | undefined => {

  return OPERATIONS[operation];

};



/**

 * Calculator class - provides a functional interface to the calculator

 * This is a facade that wraps the pure functions in a convenient API

 */

export class Calculator {

  private state: CalculatorState;



  constructor() {

    this.state = initialState;

  }



  /**

   * Gets the current state

   */

  public getState(): CalculatorState {

    return this.state;

  }



  /**

   * Dispatches an action to the reducer

   * @param action - Action to dispatch

   */

  public dispatch(action: Action): void {

    this.state = reducer(this.state, action);

  }



  /**

   * Inputs a digit

   * @param digit - Digit to input (0-9)

   */

  public inputDigit(digit: string): void {

    this.dispatch({ type: 'INPUT_DIGIT', payload: { digit } });

  }



  /**

   * Inputs an operator

   * @param operation - Operation to input

   */

  public inputOperator(operation: Operation): void {

    this.dispatch({ type: 'INPUT_OPERATOR', payload: { operation } });

  }



  /**

   * Performs calculation (equals)

   */

  public calculate(): void {

    this.dispatch({ type: 'CALCULATE' });

  }



  /**

   * Clears the calculator

   */

  public clear(): void {

    this.dispatch({ type: 'CLEAR' });

  }



  /**

   * Toggles the sign of the current value

   */

  public toggleSign(): void {

    this.dispatch({ type: 'TOGGLE_SIGN' });

  }



  /**

   * Adds a decimal point

   */

  public addDecimal(): void {

    this.dispatch({ type: 'ADD_DECIMAL' });

  }



  /**

   * Removes the last digit

   */

  public backspace(): void {

    this.dispatch({ type: 'BACKSPACE' });

  }



  /**

   * Calculates percentage of current value

   */

  public percentage(): void {

    this.dispatch({ type: 'PERCENTAGE' });

  }



  /**

   * Executes an operation directly with two numbers

   * @param operation - Operation to perform

   * @param a - First number

   * @param b - Second number

   * @returns Result of the operation

   */

  public executeOperation(

    operation: Operation,

    a: number,

    b: number

  ): { success: boolean; value?: number; error?: string } {

    const opFn = getOperation(operation);

    if (!opFn) {

      return { success: false, error: `Unknown operation: ${operation}` };

    }



    try {

      if (operation === '√') {

        // Square root is unary, use only first argument

        const result = (opFn as (a: number) => number)(a);

        return { success: true, value: result };

      } else {

        const result = (opFn as (a: number, b: number) => number)(a, b);

        return { success: true, value: result };

      }

    } catch (error) {

      return {

        success: false,

        error: error instanceof Error ? error.message : 'Unknown error'

      };

    }

  }

}



// Default export for convenience



// Default export for convenience


if (typeof document !== 'undefined') {
  (function initCalculator() {
    function setupCalculator() {
      console.log('setupCalculator called');
      // Get DOM elements
      const displayElement = document.getElementById('current-value') as HTMLElement;
      const operationElement = document.getElementById('operation') as HTMLElement;
      const buttonGrid = document.querySelector('.button-grid') as HTMLElement;

      console.log('DOM elements:', { displayElement, operationElement, buttonGrid });

      if (!displayElement || !operationElement || !buttonGrid) {
        console.error('Calculator elements not found in DOM');
        return;
      }

      // Create calculator instance
      const calculator = new Calculator();
      console.log('Calculator instance created');

      // Update display based on current state
      function updateDisplay() {
        const state = calculator.getState();
        console.log('updateDisplay called, state:', state);
        displayElement.textContent = state.display;
        operationElement.textContent = state.operation || '';

        // Show error if present
        if (state.error) {
          displayElement.textContent = state.error;
          displayElement.classList.add('error');
        } else {
          displayElement.classList.remove('error');
        }
      }

      // Handle number button clicks
      function handleNumberClick(event: Event) {
        console.log('handleNumberClick called');
        const target = event.target as HTMLElement;
        const value = target.getAttribute('data-value');
        console.log('data-value:', value, 'class:', target.className);
        if (value) {
          calculator.inputDigit(value);
          updateDisplay();
        }
      }

      // Handle operation button clicks
      function handleOperationClick(event: Event) {
        console.log('handleOperationClick called');
        const target = event.target as HTMLElement;
        const action = target.getAttribute('data-action');
        console.log('data-action:', action, 'class:', target.className);
        if (action) {
          switch (action) {
            case 'clear':
              calculator.clear();
              break;
            case 'power':
              calculator.inputOperator('^');
              break;
            case 'sqrt':
              calculator.inputOperator('√');
              break;
            case 'divide':
              calculator.inputOperator('/');
              break;
            case 'multiply':
              calculator.inputOperator('*');
              break;
            case 'subtract':
              calculator.inputOperator('-');
              break;
            case 'add':
              calculator.inputOperator('+');
              break;
            case 'decimal':
              calculator.addDecimal();
              break;
            case 'equals':
              calculator.calculate();
              break;
          }
          updateDisplay();
        }
      }

      // Add event listeners to button grid (event delegation)
      buttonGrid.addEventListener('click', (event) => {
        console.log('buttonGrid click event');
        const target = event.target as HTMLElement;

        // Check if clicked element is a button
        if (target.tagName === 'BUTTON') {
          console.log('Button clicked, tagName:', target.tagName, 'class:', target.className);
          // Check data-action first (takes precedence over class)
          const action = target.getAttribute('data-action');
          if (action) {
            console.log('Calling handleOperationClick');
            handleOperationClick(event);
          }
          // Then check if it's a number button (for digits 0-9)
          else if (target.classList.contains('number')) {
            console.log('Calling handleNumberClick');
            handleNumberClick(event);
          }
          else {
            console.log('Button matched no handler');
          }
        }
      });

      // Add keyboard support
      document.addEventListener('keydown', handleKeyDown);

      function handleKeyDown(event: KeyboardEvent) {
        const key = event.key;

        // Prevent default for calculator keys
        if (isCalculatorKey(key)) {
          event.preventDefault();
        }

        // Number keys
        if (key >= '0' && key <= '9') {
          calculator.inputDigit(key);
          updateDisplay();
        }
        // Decimal point
        else if (key === '.' || key === ',') {
          calculator.addDecimal();
          updateDisplay();
        }
        // Operators
        else if (key === '+') {
          calculator.inputOperator('+');
          updateDisplay();
        }
        else if (key === '-') {
          calculator.inputOperator('-');
          updateDisplay();
        }
        else if (key === '*' || key === 'x' || key === 'X') {
          calculator.inputOperator('*');
          updateDisplay();
        }
        else if (key === '/') {
          calculator.inputOperator('/');
          updateDisplay();
        }
        else if (key === '^') {
          calculator.inputOperator('^');
          updateDisplay();
        }
        else if (key === 'Enter' || key === '=') {
          calculator.calculate();
          updateDisplay();
        }
        else if (key === 'Escape' || key === 'c' || key === 'C') {
          calculator.clear();
          updateDisplay();
        }
        else if (key === 'Backspace') {
          calculator.backspace();
          updateDisplay();
        }
        else if (key === '%') {
          calculator.percentage();
          updateDisplay();
        }
      }

      function isCalculatorKey(key: string): boolean {
        const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                           '.', ',', '+', '-', '*', 'x', 'X', '/', '^',
                           'Enter', '=', 'Escape', 'c', 'C', 'Backspace', '%'];
        return validKeys.includes(key);
      }

      // Initial display update
      updateDisplay();

      console.log('Calculator initialized successfully');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupCalculator);
    } else {
      setupCalculator();
    }
  })();
}


export default Calculator;
