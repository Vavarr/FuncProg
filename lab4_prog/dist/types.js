/**
 * Type definitions for the Functional Programming Calculator
 * All types are designed to enforce immutability and type safety
 */
// Type guards for discriminating operation types
/**
 * Type guard to check if an operation is unary (square root)
 */
export const isUnaryOperation = (op) => {
    return op === '√';
};
/**
 * Type guard to check if an operation is binary
 */
export const isBinaryOperation = (op) => {
    return op !== '√';
};
/**
 * Type guard to check if an action is INPUT_DIGIT
 */
export const isInputDigitAction = (action) => {
    return action.type === 'INPUT_DIGIT';
};
/**
 * Type guard to check if an action is INPUT_OPERATOR
 */
export const isInputOperatorAction = (action) => {
    return action.type === 'INPUT_OPERATOR';
};
/**
 * Type guard to check if an action is CALCULATE
 */
export const isCalculateAction = (action) => {
    return action.type === 'CALCULATE';
};
//# sourceMappingURL=types.js.map