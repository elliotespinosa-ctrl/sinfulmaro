/**
 * Main Application
 * Demonstrates the usage of various utility functions
 */

const {
  capitalize,
  reverse,
  isPalindrome,
  unique,
  chunk,
  flatten,
  deepClone,
  getProperty,
  isValidEmail,
  validatePassword,
} = require('./utils');

/**
 * Demo application showcasing utility functions
 */
class SinfulmaroApp {
  constructor() {
    this.name = 'Sinfulmaro Utility Library';
    this.version = '1.0.0';
  }

  /**
   * Runs all demonstration examples
   */
  runDemos() {
    console.log(`\n🚀 ${this.name} v${this.version}\n`);
    console.log('='.repeat(50));

    this.stringDemo();
    this.arrayDemo();
    this.objectDemo();
    this.validationDemo();

    console.log('='.repeat(50));
    console.log('\n✅ All demonstrations completed!\n');
  }

  /**
   * String utilities demonstration
   */
  stringDemo() {
    console.log('\n📝 String Utilities Demo:');
    console.log('-'.repeat(50));

    const text = 'hello world';
    console.log(`Original: "${text}"`);
    console.log(`Capitalized: "${capitalize(text)}"`);
    console.log(`Reversed: "${reverse(text)}"`);
    console.log(`Is Palindrome: ${isPalindrome('racecar')}`);
  }

  /**
   * Array utilities demonstration
   */
  arrayDemo() {
    console.log('\n🔢 Array Utilities Demo:');
    console.log('-'.repeat(50));

    const numbers = [1, 2, 2, 3, 4, 4, 5];
    console.log(`Original: [${numbers}]`);
    console.log(`Unique: [${unique(numbers)}]`);
    console.log(`Chunked (size 2): ${JSON.stringify(chunk(numbers, 2))}`);

    const nested = [1, [2, [3, [4]]]];
    console.log(`Nested: ${JSON.stringify(nested)}`);
    console.log(`Flattened: [${flatten(nested, Infinity)}]`);
  }

  /**
   * Object utilities demonstration
   */
  objectDemo() {
    console.log('\n📦 Object Utilities Demo:');
    console.log('-'.repeat(50));

    const user = {
      name: 'John Doe',
      address: {
        city: 'New York',
        zip: '10001',
      },
    };

    console.log('Original object:', JSON.stringify(user, null, 2));
    const cloned = deepClone(user);
    console.log('Deep cloned:', cloned);
    console.log('City:', getProperty(user, 'address.city'));
    console.log('Non-existent:', getProperty(user, 'address.country', 'USA'));
  }

  /**
   * Validation utilities demonstration
   */
  validationDemo() {
    console.log('\n✅ Validation Utilities Demo:');
    console.log('-'.repeat(50));

    const emails = ['test@example.com', 'invalid-email', 'user@domain.co'];
    emails.forEach((email) => {
      console.log(`"${email}": ${isValidEmail(email) ? '✓' : '✗'}`);
    });

    const password = 'SecureP@ss123';
    const validation = validatePassword(password);
    console.log(`\nPassword strength: ${validation.strength}`);
    console.log(`Valid: ${validation.isValid}`);
  }
}

// Run demos if executed directly
if (require.main === module) {
  const app = new SinfulmaroApp();
  app.runDemos();
}

module.exports = SinfulmaroApp;
