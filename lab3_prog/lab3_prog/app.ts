/**
 * Function 1: Filters an array of numbers, returning only those divisible by a given divisor
 * @param numbers - Array of numbers to filter
 * @param divisor - Number to check divisibility against
 * @returns New array containing numbers divisible by the divisor
 */
function filterMultiples(numbers: number[], divisor: number): number[] {
    return numbers.filter(number => number % divisor === 0);
}

/**
 * Function 2: Joins an array of strings with a specified delimiter
 * @param strings - Array of strings to join
 * @param delimiter - String to use as separator
 * @returns Combined string with all elements joined by delimiter
 */
function joinStrings(strings: string[], delimiter: string): string {
    return strings.join(delimiter);
}

/**
 * Function 3: Sorts an array of objects by a specified property
 * Simplified version that works with any object type
 * @param items - Array of objects to sort
 * @param property - Key of the object to sort by (as string)
 * @returns New array sorted by the specified property in ascending order
 */
function sortByProperty<T extends Record<string, any>>(items: T[], property: string): T[] {
    return [...items].sort((a, b) => {
        const aValue = a[property];
        const bValue = b[property];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
        }

        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
    });
}

/**
 * Function 4: Higher-order function that adds logging functionality to any function
 * @param fn - Function to wrap with logging
 * @returns New function that logs before executing the original function
 */
function withLogging<T extends (...args: any[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>): ReturnType<T> => {
        console.log(`Calling function ${fn.name || 'anonymous'} with arguments:`, args);
        const result = fn(...args);
        console.log(`Function ${fn.name || 'anonymous'} returned:`, result);
        return result;
    };
}

// Demonstration of all functions
function demonstrateFunctions(): void {
    console.log('=== DEMONSTRATION OF PURE FUNCTIONS ===\n');

    console.log('--- 1. filterMultiples ---');
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const multiplesOf3 = filterMultiples(numbers, 3);
    console.log('Original numbers:', numbers);
    console.log('Multiples of 3:', multiplesOf3);
    console.log();

    console.log('--- 2. joinStrings ---');
    const words = ['Hello', 'TypeScript', 'World'];
    const joined = joinStrings(words, ' - ');
    console.log('Original strings:', words);
    console.log('Joined strings:', joined);
    console.log();

    console.log('--- 3. sortByProperty ---');

    interface Person {
        name: string;
        age: number;
        city: string;
    }

    const people: Person[] = [
        { name: 'Alice', age: 30, city: 'New York' },
        { name: 'Bob', age: 25, city: 'Los Angeles' },
        { name: 'Charlie', age: 35, city: 'Chicago' },
        { name: 'Diana', age: 28, city: 'Boston' }
    ];

    console.log('Original people array:');
    console.log(people);
    console.log();

    const sortedByAge = sortByProperty<Person>(people, 'age');
    console.log('Sorted by age:');
    console.log(sortedByAge);
    console.log();

    const sortedByName = sortByProperty<Person>(people, 'name');
    console.log('Sorted by name:');
    console.log(sortedByName);
    console.log();

    const sortedByCity = sortByProperty<Person>(people, 'city');
    console.log('Sorted by city:');
    console.log(sortedByCity);
    console.log();

    interface Product {
        name: string;
        price: number;
        inStock: boolean;
    }

    const products: Product[] = [
        { name: 'Laptop', price: 1200, inStock: true },
        { name: 'Mouse', price: 25, inStock: false },
        { name: 'Keyboard', price: 75, inStock: true },
        { name: 'Monitor', price: 350, inStock: true }
    ];

    console.log('Products sorted by price:');
    console.log(sortByProperty<Product>(products, 'price'));
    console.log();

    console.log('--- 4. withLogging Higher-Order Function ---');

    const loggedFilter = withLogging(filterMultiples);
    const loggedJoin = withLogging(joinStrings);
    const loggedSort = withLogging(sortByProperty);

    console.log('Testing loggedFilter:');
    loggedFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2);
    console.log();

    console.log('Testing loggedJoin:');
    loggedJoin(['apple', 'banana', 'cherry'], ', ');
    console.log();

    console.log('Testing loggedSort:');
    const typedLoggedSort = withLogging(<T extends Record<string, any>>(items: T[], property: string) => sortByProperty(items, property));
    typedLoggedSort(people, 'age');
    console.log();

    console.log('Direct call with logging:');
    console.log('Calling sortByProperty with logging:');
    console.log('Arguments:', people, 'age');
    const sortResult = sortByProperty(people, 'age');
    console.log('\nResult:', sortResult);
}

demonstrateFunctions();

module.exports = {
    filterMultiples,
    joinStrings,
    sortByProperty,
    withLogging
};