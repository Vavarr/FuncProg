/**
 * Type definitions for the Functional Programming Calculator
 * All types are designed to enforce immutability and type safety
 */
export type Operation = '+' | '-' | '*' | '/' | '^' | '√';
export interface CalculatorState {
    readonly display: string;
    readonly currentValue: number | null;
    readonly previousValue: number | null;
    readonly operation: Operation | null;
    readonly shouldResetDisplay: boolean;
    readonly history: readonly string[];
    readonly error: string | null;
}
export type Action = {
    type: 'INPUT_DIGIT';
    payload: {
        digit: string;
    };
} | {
    type: 'INPUT_OPERATOR';
    payload: {
        operation: Operation;
    };
} | {
    type: 'CALCULATE';
} | {
    type: 'CLEAR';
} | {
    type: 'TOGGLE_SIGN';
} | {
    type: 'ADD_DECIMAL';
} | {
    type: 'BACKSPACE';
} | {
    type: 'PERCENTAGE';
};
export type OperationFunction = (a: number, b: number) => number;
export type UnaryOperation = (a: number) => number;
export type Result<T> = {
    success: true;
    value: T;
} | {
    success: false;
    error: string;
};
export type EventHandler = (state: CalculatorState, payload?: any) => CalculatorState;
export type OperationRegistry = Record<Operation, OperationFunction | UnaryOperation>;
/**
 * Type guard to check if an operation is unary (square root)
 */
export declare const isUnaryOperation: (op: Operation) => op is "\u221A";
/**
 * Type guard to check if an operation is binary
 */
export declare const isBinaryOperation: (op: Operation) => op is Exclude<Operation, "\u221A">;
/**
 * Type guard to check if an action is INPUT_DIGIT
 */
export declare const isInputDigitAction: (action: Action) => action is {
    type: "INPUT_DIGIT";
    payload: {
        digit: string;
    };
};
/**
 * Type guard to check if an action is INPUT_OPERATOR
 */
export declare const isInputOperatorAction: (action: Action) => action is {
    type: "INPUT_OPERATOR";
    payload: {
        operation: Operation;
    };
};
/**
 * Type guard to check if an action is CALCULATE
 */
export declare const isCalculateAction: (action: Action) => action is {
    type: "CALCULATE";
};
//# sourceMappingURL=types.d.ts.map