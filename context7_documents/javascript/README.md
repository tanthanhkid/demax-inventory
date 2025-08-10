# JavaScript Documentation

## JavaScript Overview
JavaScript là một ngôn ngữ lập trình động, được thông dịch, hỗ trợ lập trình hướng đối tượng dựa trên prototype. JavaScript được sử dụng rộng rãi để tạo ra các trang web tương tác và các ứng dụng web.

## Cài đặt và Chạy JavaScript

### Browser
```html
<!-- Inline JavaScript -->
<script>
    console.log("Hello World!");
</script>

<!-- External JavaScript -->
<script src="script.js"></script>

<!-- ES6 Modules -->
<script type="module">
    import { myFunction } from './module.js';
</script>
```

### Node.js
```bash
# Cài đặt Node.js
npm install -g node

# Chạy file JavaScript
node script.js

# Chạy với ES modules
node --experimental-modules script.mjs
```

## Variables và Data Types

### Variable Declaration
```javascript
// var (function-scoped, hoisted)
var oldWay = "not recommended";

// let (block-scoped, not hoisted)
let modernWay = "recommended";

// const (block-scoped, immutable reference)
const constant = "cannot be reassigned";

// Destructuring
const { name, age } = { name: "John", age: 30 };
const [first, second] = [1, 2];
```

### Data Types
```javascript
// Primitive Types
let string = "Hello World";
let number = 42;
let boolean = true;
let nullValue = null;
let undefinedValue = undefined;
let symbol = Symbol("description");
let bigInt = 9007199254740991n;

// Reference Types
let object = { key: "value" };
let array = [1, 2, 3];
let function = function() { return "Hello"; };
```

## Functions

### Function Declarations
```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const greet = function(name) {
    return `Hello, ${name}!`;
};

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Arrow function with multiple parameters
const add = (a, b) => a + b;

// Arrow function with block body
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
```

### Function Parameters
```javascript
// Default parameters
function greet(name = "World") {
    return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Destructuring parameters
function processUser({ name, age, email }) {
    console.log(`${name} is ${age} years old`);
}
```

### Higher-Order Functions
```javascript
// Function returning function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

// Function as parameter
function processArray(array, callback) {
    return array.map(callback);
}

const numbers = [1, 2, 3, 4];
const doubled = processArray(numbers, x => x * 2);
```

## Objects

### Object Creation
```javascript
// Object literal
const person = {
    name: "John",
    age: 30,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const john = new Person("John", 30);

// Class (ES6)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
}
```

### Object Methods
```javascript
const obj = {
    name: "Object",
    
    // Method shorthand
    greet() {
        return `Hello from ${this.name}`;
    },
    
    // Computed property names
    [`method_${Date.now()}`]() {
        return "Dynamic method";
    }
};

// Object destructuring
const { name, greet } = obj;
```

## Arrays

### Array Methods
```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform elements
const doubled = numbers.map(x => x * 2);

// filter - select elements
const evenNumbers = numbers.filter(x => x % 2 === 0);

// reduce - accumulate values
const sum = numbers.reduce((total, num) => total + num, 0);

// find - find first matching element
const firstEven = numbers.find(x => x % 2 === 0);

// some - check if any element matches
const hasEven = numbers.some(x => x % 2 === 0);

// every - check if all elements match
const allPositive = numbers.every(x => x > 0);

// forEach - iterate over elements
numbers.forEach(x => console.log(x));
```

### Array Destructuring
```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
```

## Promises và Async/Await

### Promises
```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve("Success!");
        } else {
            reject("Failed!");
        }
    }, 1000);
});

// Using promises
myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Always executed"));
```

### Async/Await
```javascript
// Async function
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Using async/await
async function main() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}
```

### Promise.all và Promise.race
```javascript
// Promise.all - wait for all promises
const promises = [
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
];

Promise.all(promises)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => console.log(data));

// Promise.race - wait for first promise to resolve
Promise.race([
    fetch('/api/data'),
    new Promise((_, reject) => setTimeout(() => reject('Timeout'), 5000))
])
    .then(response => response.json())
    .catch(error => console.error(error));
```

## Modules (ES6)

### Export/Import
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
    return a * b;
}

// main.js
import multiply, { add, subtract } from './math.js';
import * as math from './math.js';

console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
console.log(math.subtract(5, 2)); // 3
```

### Dynamic Imports
```javascript
// Dynamic import
async function loadModule() {
    const module = await import('./dynamic-module.js');
    module.default();
}

// Conditional import
if (condition) {
    import('./feature.js').then(module => {
        module.init();
    });
}
```

## DOM Manipulation

### Selecting Elements
```javascript
// Single element
const element = document.getElementById('myId');
const element = document.querySelector('.myClass');
const element = document.querySelector('[data-attribute]');

// Multiple elements
const elements = document.getElementsByClassName('myClass');
const elements = document.querySelectorAll('.myClass');
```

### Creating and Modifying Elements
```javascript
// Create element
const div = document.createElement('div');
div.textContent = 'Hello World';
div.className = 'my-class';

// Append to DOM
document.body.appendChild(div);

// Modify existing element
const element = document.getElementById('myElement');
element.innerHTML = '<span>New content</span>';
element.setAttribute('data-id', '123');
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');
```

### Event Handling
```javascript
// Add event listener
element.addEventListener('click', function(event) {
    console.log('Clicked!', event);
});

// Remove event listener
const handler = function(event) {
    console.log('Handled!', event);
};
element.addEventListener('click', handler);
element.removeEventListener('click', handler);

// Event delegation
document.addEventListener('click', function(event) {
    if (event.target.matches('.button')) {
        console.log('Button clicked!');
    }
});
```

## Error Handling

### Try-Catch
```javascript
try {
    // Risky code
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // Handle error
    console.error('Error occurred:', error.message);
} finally {
    // Always executed
    console.log('Cleanup');
}
```

### Custom Errors
```javascript
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'CustomError';
        this.code = code;
    }
}

function validateInput(input) {
    if (!input) {
        throw new CustomError('Input is required', 'VALIDATION_ERROR');
    }
}
```

## Modern JavaScript Features

### Template Literals
```javascript
const name = "John";
const age = 30;

// String interpolation
const message = `Hello, my name is ${name} and I'm ${age} years old`;

// Multi-line strings
const html = `
    <div class="container">
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;

// Tagged templates
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
    }, '');
}

const highlighted = highlight`Hello ${name}, you are ${age} years old`;
```

### Spread và Rest Operators
```javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { name: "John" };
const obj2 = { ...obj1, age: 30 }; // { name: "John", age: 30 }

// Rest operator
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

const [first, second, ...rest] = [1, 2, 3, 4, 5];
```

### Optional Chaining và Nullish Coalescing
```javascript
// Optional chaining
const user = {
    profile: {
        name: "John"
    }
};

const userName = user?.profile?.name; // "John"
const userAge = user?.profile?.age; // undefined

// Nullish coalescing
const age = user?.profile?.age ?? 25; // 25 (if age is null or undefined)
const name = user?.profile?.name ?? "Unknown"; // "John"
```

## Best Practices

1. **Use const by default, let when needed**
2. **Prefer arrow functions for short functions**
3. **Use template literals for string interpolation**
4. **Use destructuring for cleaner code**
5. **Handle errors properly**
6. **Use async/await over raw promises**
7. **Avoid global variables**
8. **Use meaningful variable names**
9. **Write self-documenting code**
10. **Test your code thoroughly**

## Resources
- [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [ES6 Features](https://github.com/lukehoban/es6features)
