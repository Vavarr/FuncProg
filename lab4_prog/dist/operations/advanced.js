/**
 * Advanced mathematical operations for the calculator
 * All functions are pure and immutable - they have no side effects
 * and always return the same output for the same input
 */
/**
 * Raises a number to a power (exponentiation)
 * @param base - The base number
 * @param exponent - The exponent
 * @returns base raised to the power of exponent
 */
export const power = (base, exponent) => {
    return Math.pow(base, exponent);
};
/**
 * Calculates the square root of a number
 * @param value - The number to calculate square root for
 * @returns The square root of the value
 * @throws {Error} If the value is negative
 */
export const sqrt = (value) => {
    if (value < 0) {
        throw new Error('√(-)');
    }
    return Math.sqrt(value);
};
/**
 * Alternative version of square root that returns a Result type
 * instead of throwing exceptions - more functional approach
 * @param value - The number to calculate square root for
 * @returns Result containing either the square root or an error message
 */
export const sqrtSafe = (value) => {
    if (value < 0) {
        return { success: false, error: '√(-)' };
    }
    return { success: true, value: Math.sqrt(value) };
};
/**
 * Alternative version of division that returns a Result type
 * @param a - Dividend
 * @param b - Divisor
 * @returns Result containing either the quotient or an error message
 */
export const divideSafe = (a, b) => {
    if (b === 0) {
        return { success: false, error: 'Division by zero' };
    }
    return { success: true, value: a / b };
};
//# sourceMappingURL=advanced.js.map