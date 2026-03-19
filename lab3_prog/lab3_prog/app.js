/**
 * A collection of pure functions for array manipulation
 * All functions are side-effect free and use explicit type annotations
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Function 1: Filters an array of numbers, returning only those divisible by a given divisor
 * @param numbers - Array of numbers to filter
 * @param divisor - Number to check divisibility against
 * @returns New array containing numbers divisible by the divisor
 */
function filterMultiples(numbers, divisor) {
    return numbers.filter(function (number) { return number % divisor === 0; });
}
/**
 * Function 2: Joins an array of strings with a specified delimiter
 * @param strings - Array of strings to join
 * @param delimiter - String to use as separator
 * @returns Combined string with all elements joined by delimiter
 */
function joinStrings(strings, delimiter) {
    return strings.join(delimiter);
}
/**
 * Function 3: Sorts an array of objects by a specified property
 * Simplified version that works with any object type
 * @param items - Array of objects to sort
 * @param property - Key of the object to sort by (as string)
 * @returns New array sorted by the specified property in ascending order
 */
function sortByProperty(items, property) {
    // Create a new array to avoid mutating the original
    return __spreadArray([], items, true).sort(function (a, b) {
        var aValue = a[property];
        var bValue = b[property];
        // Handle string comparison specially for proper alphabetical sorting
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
        }
        // For numbers and other comparable types
        if (aValue < bValue)
            return -1;
        if (aValue > bValue)
            return 1;
        return 0;
    });
}
/**
 * Function 4: Higher-order function that adds logging functionality to any function
 * @param fn - Function to wrap with logging
 * @returns New function that logs before executing the original function
 */
function withLogging(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Calling function ".concat(fn.name || 'anonymous', " with arguments:"), args);
        var result = fn.apply(void 0, args);
        console.log("Function ".concat(fn.name || 'anonymous', " returned:"), result);
        return result;
    };
}
// Demonstration of all functions
function demonstrateFunctions() {
    console.log('=== DEMONSTRATION OF PURE FUNCTIONS ===\n');
    // 1. Test filterMultiples
    console.log('--- 1. filterMultiples ---');
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var multiplesOf3 = filterMultiples(numbers, 3);
    console.log('Original numbers:', numbers);
    console.log('Multiples of 3:', multiplesOf3);
    console.log();
    // 2. Test joinStrings
    console.log('--- 2. joinStrings ---');
    var words = ['Hello', 'TypeScript', 'World'];
    var joined = joinStrings(words, ' - ');
    console.log('Original strings:', words);
    console.log('Joined strings:', joined);
    console.log();
    // 3. Test sortByProperty with different object types
    console.log('--- 3. sortByProperty ---');
    var people = [
        { name: 'Alice', age: 30, city: 'New York' },
        { name: 'Bob', age: 25, city: 'Los Angeles' },
        { name: 'Charlie', age: 35, city: 'Chicago' },
        { name: 'Diana', age: 28, city: 'Boston' }
    ];
    console.log('Original people array:');
    console.log(people);
    console.log();
    // Explicitly type the function call to avoid the 'never' error
    var sortedByAge = sortByProperty(people, 'age');
    console.log('Sorted by age:');
    console.log(sortedByAge);
    console.log();
    var sortedByName = sortByProperty(people, 'name');
    console.log('Sorted by name:');
    console.log(sortedByName);
    console.log();
    var sortedByCity = sortByProperty(people, 'city');
    console.log('Sorted by city:');
    console.log(sortedByCity);
    console.log();
    var products = [
        { name: 'Laptop', price: 1200, inStock: true },
        { name: 'Mouse', price: 25, inStock: false },
        { name: 'Keyboard', price: 75, inStock: true },
        { name: 'Monitor', price: 350, inStock: true }
    ];
    console.log('Products sorted by price:');
    console.log(sortByProperty(products, 'price'));
    console.log();
    // 4. Test withLogging higher-order function
    console.log('--- 4. withLogging Higher-Order Function ---');
    var loggedFilter = withLogging(filterMultiples);
    var loggedJoin = withLogging(joinStrings);
    var loggedSort = withLogging(sortByProperty);
    console.log('Testing loggedFilter:');
    loggedFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2);
    console.log();
    console.log('Testing loggedJoin:');
    loggedJoin(['apple', 'banana', 'cherry'], ', ');
    console.log();
    console.log('Testing loggedSort:');
    // Need to type the function call here too
    var typedLoggedSort = withLogging(function (items, property) { return sortByProperty(items, property); });
    typedLoggedSort(people, 'age');
    console.log();
    // Simpler approach: just call the function directly
    console.log('Direct call with logging:');
    console.log('Calling sortByProperty with logging:');
    console.log('Arguments:', people, 'age');
    var sortResult = sortByProperty(people, 'age');
    console.log('Result:', sortResult);
}
// Run the demonstration
demonstrateFunctions();
// Export all functions for reuse in other modules
module.exports = {
    filterMultiples: filterMultiples,
    joinStrings: joinStrings,
    sortByProperty: sortByProperty,
    withLogging: withLogging
};
