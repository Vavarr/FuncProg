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
export const validateBinaryOperation = (
  operation: OperationFunction,
  validator: (a: number, b: number) => boolean,
  errorMessage: string
): OperationFunction => {
  return (a: number, b: number): number => {
    if (!validator(a, b)) {
      throw new Error(errorMessage);
    }
    return operation(a, b);
  };
};

/**
 * Validates inputs before executing a unary operation
 * @param operation - The operation function to wrap
 * @param validator - Function that validates the argument
 * @param errorMessage - Error message if validation fails
 * @returns A new operation function with validation
 */
export const validateUnaryOperation = (
  operation: UnaryOperation,
  validator: (a: number) => boolean,
  errorMessage: string
): UnaryOperation => {
  return (a: number): number => {
    if (!validator(a)) {
      throw new Error(errorMessage);
    }
    return operation(a);
  };
};

/**
 * Adds logging to a binary operation function
 * @param operation - The operation function to wrap
 * @param operationName - Name of the operation for logging
 * @returns A new operation function with logging
 */
export const withLogging = (
  operation: OperationFunction,
  operationName: string
): OperationFunction => {
  return (a: number, b: number): number => {
    console.log(`${operationName} called with:`, a, b);
    const result = operation(a, b);
    console.log(`${operationName} result:`, result);
    return result;
  };
};

/**
 * Adds logging to a unary operation function
 * @param operation - The operation function to wrap
 * @param operationName - Name of the operation for logging
 * @returns A new operation function with logging
 */
export const withLoggingUnary = (
  operation: UnaryOperation,
  operationName: string
): UnaryOperation => {
  return (a: number): number => {
    console.log(`${operationName} called with:`, a);
    const result = operation(a);
    console.log(`${operationName} result:`, result);
    return result;
  };
};

/**
 * Composes multiple functions from right to left
 * The output of each function is passed as input to the next
 * @param fns - Functions to compose (right to left)
 * @returns A composed function
 */
export const compose = <T, U, V>(
  ...fns: Array<(arg: T) => U | V>
): ((arg: T) => V) => {
  return (arg: T): V => {
    return fns.reduceRight((acc, fn) => fn(acc), arg as any) as V;
  };
};

/**
 * Pipes value through multiple functions from left to right
 * Alternative to compose with more intuitive flow
 * @param fns - Functions to pipe (left to right)
 * @returns A piped function
 */
export const pipe = <T, U, V>(
  ...fns: Array<(arg: T) => U | V>
): ((arg: T) => V) => {
  return (arg: T): V => {
    return fns.reduce((acc, fn) => fn(acc), arg as any) as V;
  };
};

/**
 * Curries a binary operation function for partial application
 * @param fn - Binary function to curry
 * @returns Curried function that can be called with one argument at a time
 */
export const curryBinary = (
  fn: OperationFunction
): ((a: number) => (b: number) => number) => {
  return (a: number): ((b: number) => number) => {
    return (b: number): number => fn(a, b);
  };
};

/**
 * Curries a unary operation function (essentially returns the function as-is)
 * This is provided for consistency
 * @param fn - Unary function
 * @returns The same unary function
 */
export const curryUnary = (fn: UnaryOperation): UnaryOperation => {
  return fn;
};

/**
 * Memoizes a binary operation function to cache results
 * Useful for expensive operations like square root or exponentiation
 * @param fn - Binary function to memoize
 * @returns Memoized version of the function
 */
export const memoizeBinary = (fn: OperationFunction): OperationFunction => {
  const cache = new Map<string, number>();
  return (a: number, b: number): number => {
    const key = `${a},${b}`;
    if (!cache.has(key)) {
      cache.set(key, fn(a, b));
    }
    return cache.get(key)!;
  };
};

/**
 * Memoizes a unary operation function to cache results
 * @param fn - Unary function to memoize
 * @returns Memoized version of the function
 */
export const memoizeUnary = (fn: UnaryOperation): UnaryOperation => {
  const cache = new Map<number, number>();
  return (a: number): number => {
    if (!cache.has(a)) {
      cache.set(a, fn(a));
    }
    return cache.get(a)!;
  };
};

/**
 * Creates a safe version of a binary operation that returns Result type
 * instead of throwing exceptions
 * @param operation - Binary operation function to wrap
 * @param errorMessage - Error message if operation fails
 * @returns Safe operation function returning Result
 */
export const safeBinaryOperation = (
  operation: OperationFunction,
  errorMessage: string
): ((a: number, b: number) => Result<number>) => {
  return (a: number, b: number): Result<number> => {
    try {
      const result = operation(a, b);
      return { success: true, value: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : errorMessage
      };
    }
  };
};

/**
 * Creates a safe version of a unary operation that returns Result type
 * @param operation - Unary operation function to wrap
 * @param errorMessage - Error message if operation fails
 * @returns Safe operation function returning Result
 */
export const safeUnaryOperation = (
  operation: UnaryOperation,
  errorMessage: string
): ((a: number) => Result<number>) => {
  return (a: number): Result<number> => {
    try {
      const result = operation(a);
      return { success: true, value: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : errorMessage
      };
    }
  };
};

/**
 * Creates a partially applied binary function by fixing the first argument
 * @param fn - Binary function to partially apply
 * @param fixedArg - First argument to fix
 * @returns Partially applied function waiting for the second argument
 */
export const partialBinary = (
  fn: OperationFunction,
  fixedArg: number
): ((b: number) => number) => {
  return (b: number): number => fn(fixedArg, b);
};

/**
 * Creates a partially applied binary function by fixing the second argument
 * @param fn - Binary function to partially apply
 * @param fixedArg - Second argument to fix
 * @returns Partially applied function waiting for the first argument
 */
export const partialBinaryRight = (
  fn: OperationFunction,
  fixedArg: number
): ((a: number) => number) => {
  return (a: number): number => fn(a, fixedArg);
};

/**
 * Identity function - returns the input unchanged
 * Useful as a default in function composition
 */
export const identity = <T>(value: T): T => value;

/**
 * Creates a constant function that always returns the same value
 * @param value - Value to always return
 * @returns Function that returns the constant value
 */
export const constant = <T>(value: T): () => T => {
  return () => value;
};
