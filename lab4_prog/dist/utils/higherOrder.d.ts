/**
 * Higher-order functions for the calculator
 * These functions wrap operations with additional functionality
 * following functional programming principles
 */
import { OperationFunction, UnaryOperation, Result } from '../types.js';
/**
 * Validates inputs before executing a binary operation
 * @param operation - The operation function to wrap
 * @param validator - Function that validates the arguments
 * @param errorMessage - Error message if validation fails
 * @returns A new operation function with validation
 */
export declare const validateBinaryOperation: (operation: OperationFunction, validator: (a: number, b: number) => boolean, errorMessage: string) => OperationFunction;
/**
 * Validates inputs before executing a unary operation
 * @param operation - The operation function to wrap
 * @param validator - Function that validates the argument
 * @param errorMessage - Error message if validation fails
 * @returns A new operation function with validation
 */
export declare const validateUnaryOperation: (operation: UnaryOperation, validator: (a: number) => boolean, errorMessage: string) => UnaryOperation;
/**
 * Adds logging to a binary operation function
 * @param operation - The operation function to wrap
 * @param operationName - Name of the operation for logging
 * @returns A new operation function with logging
 */
export declare const withLogging: (operation: OperationFunction, operationName: string) => OperationFunction;
/**
 * Adds logging to a unary operation function
 * @param operation - The operation function to wrap
 * @param operationName - Name of the operation for logging
 * @returns A new operation function with logging
 */
export declare const withLoggingUnary: (operation: UnaryOperation, operationName: string) => UnaryOperation;
/**
 * Composes multiple functions from right to left
 * The output of each function is passed as input to the next
 * @param fns - Functions to compose (right to left)
 * @returns A composed function
 */
export declare const compose: <T, U, V>(...fns: Array<(arg: T) => U | V>) => ((arg: T) => V);
/**
 * Pipes value through multiple functions from left to right
 * Alternative to compose with more intuitive flow
 * @param fns - Functions to pipe (left to right)
 * @returns A piped function
 */
export declare const pipe: <T, U, V>(...fns: Array<(arg: T) => U | V>) => ((arg: T) => V);
/**
 * Curries a binary operation function for partial application
 * @param fn - Binary function to curry
 * @returns Curried function that can be called with one argument at a time
 */
export declare const curryBinary: (fn: OperationFunction) => ((a: number) => (b: number) => number);
/**
 * Curries a unary operation function (essentially returns the function as-is)
 * This is provided for consistency
 * @param fn - Unary function
 * @returns The same unary function
 */
export declare const curryUnary: (fn: UnaryOperation) => UnaryOperation;
/**
 * Memoizes a binary operation function to cache results
 * Useful for expensive operations like square root or exponentiation
 * @param fn - Binary function to memoize
 * @returns Memoized version of the function
 */
export declare const memoizeBinary: (fn: OperationFunction) => OperationFunction;
/**
 * Memoizes a unary operation function to cache results
 * @param fn - Unary function to memoize
 * @returns Memoized version of the function
 */
export declare const memoizeUnary: (fn: UnaryOperation) => UnaryOperation;
/**
 * Creates a safe version of a binary operation that returns Result type
 * instead of throwing exceptions
 * @param operation - Binary operation function to wrap
 * @param errorMessage - Error message if operation fails
 * @returns Safe operation function returning Result
 */
export declare const safeBinaryOperation: (operation: OperationFunction, errorMessage: string) => ((a: number, b: number) => Result<number>);
/**
 * Creates a safe version of a unary operation that returns Result type
 * @param operation - Unary operation function to wrap
 * @param errorMessage - Error message if operation fails
 * @returns Safe operation function returning Result
 */
export declare const safeUnaryOperation: (operation: UnaryOperation, errorMessage: string) => ((a: number) => Result<number>);
/**
 * Creates a partially applied binary function by fixing the first argument
 * @param fn - Binary function to partially apply
 * @param fixedArg - First argument to fix
 * @returns Partially applied function waiting for the second argument
 */
export declare const partialBinary: (fn: OperationFunction, fixedArg: number) => ((b: number) => number);
/**
 * Creates a partially applied binary function by fixing the second argument
 * @param fn - Binary function to partially apply
 * @param fixedArg - Second argument to fix
 * @returns Partially applied function waiting for the first argument
 */
export declare const partialBinaryRight: (fn: OperationFunction, fixedArg: number) => ((a: number) => number);
/**
 * Identity function - returns the input unchanged
 * Useful as a default in function composition
 */
export declare const identity: <T>(value: T) => T;
/**
 * Creates a constant function that always returns the same value
 * @param value - Value to always return
 * @returns Function that returns the constant value
 */
export declare const constant: <T>(value: T) => () => T;
//# sourceMappingURL=higherOrder.d.ts.map