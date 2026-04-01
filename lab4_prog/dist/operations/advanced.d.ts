/**
 * Advanced mathematical operations for the calculator
 * All functions are pure and immutable - they have no side effects
 * and always return the same output for the same input
 */
import { Result } from '../types.js';
/**
 * Raises a number to a power (exponentiation)
 * @param base - The base number
 * @param exponent - The exponent
 * @returns base raised to the power of exponent
 */
export declare const power: (base: number, exponent: number) => number;
/**
 * Calculates the square root of a number
 * @param value - The number to calculate square root for
 * @returns The square root of the value
 * @throws {Error} If the value is negative
 */
export declare const sqrt: (value: number) => number;
/**
 * Alternative version of square root that returns a Result type
 * instead of throwing exceptions - more functional approach
 * @param value - The number to calculate square root for
 * @returns Result containing either the square root or an error message
 */
export declare const sqrtSafe: (value: number) => Result<number>;
/**
 * Alternative version of division that returns a Result type
 * @param a - Dividend
 * @param b - Divisor
 * @returns Result containing either the quotient or an error message
 */
export declare const divideSafe: (a: number, b: number) => Result<number>;
//# sourceMappingURL=advanced.d.ts.map