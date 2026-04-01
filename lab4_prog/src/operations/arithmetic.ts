/**
 * Basic arithmetic operations for the calculator
 * All functions are pure and immutable - they have no side effects
 * and always return the same output for the same input
 */

/**
 * Adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export const add = (a: number, b: number): number => {
  return a + b;
};

/**
 * Subtracts the second number from the first
 * @param a - First number (minuend)
 * @param b - Second number (subtrahend)
 * @returns The difference of a and b
 */
export const subtract = (a: number, b: number): number => {
  return a - b;
};

/**
 * Multiplies two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 */
export const multiply = (a: number, b: number): number => {
  return a * b;
};

/**
 * Divides the first number by the second
 * @param a - Dividend
 * @param b - Divisor
 * @returns The quotient of a divided by b
 * @throws {Error} If division by zero is attempted
 */
export const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
};
