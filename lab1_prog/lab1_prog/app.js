//Чистые функции для работы с массивами
//Фильтрует массив, оставляя только четные числа
const filterEvenNumbers = (arr) => arr.filter(num => num % 2 === 0);

// Возвращает массив квадратов чисел
const squareNumbers = (arr) => arr.map(num => num ** 2);

//Фильтрует массив объектов, оставляя только те, у которых есть указанное свойство
const filterByProperty = (arr, propertyName) =>
    arr.filter(obj => obj.hasOwnProperty(propertyName));

//Вычисляет сумму всех чисел в массиве
const sumArray = (arr) => arr.reduce((acc, num) => acc + num, 0);

//Функция высшего порядка
//Применяет переданную функцию к каждому элементу массива
const applyFunctionToArray = (fn, arr) => arr.map(fn);

//Итоговые функции
//Находит сумму квадратов всех четных чисел в массиве
const sumOfSquaresOfEvens = (numbers) => {
    const evens = filterEvenNumbers(numbers);
    const squares = squareNumbers(evens);
    return sumArray(squares);
};

//Находит среднее арифметическое чисел, больших заданного значения, в массиве объектов
const averageOfValuesAboveThreshold = (objects, threshold, valueProperty) => {

    const objectsWithProperty = filterByProperty(objects, valueProperty);

    const validValues = objectsWithProperty
        .map(obj => obj[valueProperty])
        .filter(value => typeof value === 'number' && value > threshold);

    if (validValues.length === 0) return 0;

    const sum = sumArray(validValues);
    return sum / validValues.length;
};

//Демонстрация
//Исходные данные
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const objects = [
    { name: 'Item1', value: 10 },
    { name: 'Item2', score: 25 },
    { name: 'Item3', value: 30 },
    { name: 'Item4', score: 15 },
    { name: 'Item5', value: 5 },
    { name: 'Item6' }
];

console.log('----- Arrays -----');
console.log('Numbers:', numbers);
console.log('Objects:', JSON.stringify(objects, null, 1));

console.log('\n----- Functions -----');
console.log('Even numbers:', filterEvenNumbers(numbers));
console.log('With property (value):', JSON.stringify(filterByProperty(objects, 'value'), null, 1));
console.log('Squares of numbers:', squareNumbers(numbers));
console.log('Sum of numbers:', sumArray(numbers));

console.log('\n----- Function of High Order -----');
const double = (x) => x * 2;
console.log('Double to array:', applyFunctionToArray(double, numbers));

console.log('\n----- 1. Sum of Squares of Even Numbers -----');
console.log('Array:', numbers);
console.log('Result:', sumOfSquaresOfEvens(numbers));

console.log('\n----- 2. Arithmetic Mean -----');
console.log('Array:', JSON.stringify(objects, null, 1));
console.log('value > 5:', averageOfValuesAboveThreshold(objects, 5, 'value'));
console.log('score > 15:', averageOfValuesAboveThreshold(objects, 15, 'score'));
console.log('value > 100:', averageOfValuesAboveThreshold(objects, 100, 'value'));