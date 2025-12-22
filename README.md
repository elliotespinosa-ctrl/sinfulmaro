# sinfulmaro

![GitHub](https://img.shields.io/github/license/elliotespinosa-ctrl/sinfulmaro)
![GitHub issues](https://img.shields.io/github/issues/elliotespinosa-ctrl/sinfulmaro)
![GitHub stars](https://img.shields.io/github/stars/elliotespinosa-ctrl/sinfulmaro)

A comprehensive JavaScript utility library showcasing modern development practices, testing, and practical examples.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Utilities](#utilities)
- [Examples](#examples)
- [Testing](#testing)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Comprehensive Utility Library**: String, array, object, async, and validation utilities
- **Well-Tested**: Full test coverage with Jest
- **Modern JavaScript**: ES6+ features and best practices
- **Practical Examples**: Real-world usage demonstrations
- **Code Quality**: ESLint for code quality and Prettier for formatting
- **Type-Safe Validation**: Email, URL, phone, credit card, and password validation
- **Async Utilities**: Promise helpers, retry logic, and concurrency control

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/elliotespinosa-ctrl/sinfulmaro.git

# Navigate to the project directory
cd sinfulmaro

# Install dependencies
npm install
```

## 💻 Usage

### Quick Start

```javascript
const {
  capitalize,
  unique,
  isValidEmail,
  delay,
  deepClone,
} = require('./src/utils');

// String manipulation
console.log(capitalize('hello world')); // "Hello World"

// Array operations
console.log(unique([1, 2, 2, 3])); // [1, 2, 3]

// Validation
console.log(isValidEmail('test@example.com')); // true

// Async operations
await delay(1000); // Wait 1 second

// Object manipulation
const cloned = deepClone({ a: { b: 1 } });
```

### Running the Demo Application

```bash
npm start
```

## 🛠️ Utilities

### String Utilities

- `capitalize(str)` - Capitalize first letter of each word
- `reverse(str)` - Reverse a string
- `isPalindrome(str)` - Check if string is a palindrome
- `truncate(str, maxLength)` - Truncate string with ellipsis
- `countOccurrences(str, substring)` - Count substring occurrences

### Array Utilities

- `unique(arr)` - Remove duplicates
- `chunk(arr, size)` - Split array into chunks
- `flatten(arr, depth)` - Flatten nested arrays
- `shuffle(arr)` - Randomly shuffle array
- `groupBy(arr, keyFn)` - Group array elements by key

### Object Utilities

- `deepClone(obj)` - Deep clone objects and arrays
- `getProperty(obj, path, defaultValue)` - Get nested property safely
- `setProperty(obj, path, value)` - Set nested property
- `deepMerge(...objects)` - Merge objects deeply
- `pick(obj, keys)` - Pick specified properties

### Async Utilities

- `delay(ms)` - Delay execution
- `retry(fn, retries, delayMs)` - Retry async function
- `parallelLimit(tasks, limit)` - Run tasks with concurrency limit
- `timeout(promise, ms)` - Add timeout to promise
- `debounce(fn, ms)` - Debounce function calls

### Validation Utilities

- `isValidEmail(email)` - Validate email address
- `isValidURL(url)` - Validate URL
- `isValidPhone(phone)` - Validate phone number
- `isValidCreditCard(cardNumber)` - Validate credit card (Luhn algorithm)
- `isEmpty(value)` - Check if value is empty
- `validatePassword(password)` - Comprehensive password validation

## 📚 Examples

### Data Processing Pipeline

```bash
npm run example:data
```

Demonstrates how to combine multiple utilities for data cleaning and processing.

### Async Task Queue

```bash
npm run example:async
```

Shows async utilities for handling concurrent operations with retry logic.

### Form Validation

```bash
npm run example:validation
```

Practical form validation using validation utilities.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🛠️ Development

This project uses modern development tools:

- **ESLint**: For identifying and fixing code quality issues
- **Prettier**: For consistent code formatting
- **Jest**: For comprehensive testing

### Code Style

The project follows these conventions:

- 2-space indentation
- Single quotes for strings
- Semicolons required
- Unix line endings

### Available Scripts

```bash
npm start              # Run the demo application
npm test               # Run all tests
npm run test:coverage  # Generate test coverage report
npm run lint           # Check code quality
npm run lint:fix       # Fix linting issues
npm run format         # Format code with Prettier
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
