/**
 * Example: Form Validation
 * Demonstrates validation utilities in a practical scenario
 */

const {
  isValidEmail,
  isValidPhone,
  validatePassword,
  isEmpty,
} = require('../utils');

/**
 * Validates a user registration form
 */
function validateRegistrationForm(formData) {
  const errors = {};

  // Validate email
  if (isEmpty(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate password
  if (isEmpty(formData.password)) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.issues.join(', ');
    }
  }

  // Validate phone (optional)
  if (!isEmpty(formData.phone) && !isValidPhone(formData.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  // Validate name
  if (isEmpty(formData.name)) {
    errors.name = 'Name is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Example form data
const testForms = [
  {
    name: 'Valid Form',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecureP@ss123',
      phone: '123-456-7890',
    },
  },
  {
    name: 'Invalid Email',
    data: {
      name: 'Jane Smith',
      email: 'invalid-email',
      password: 'SecureP@ss123',
      phone: '123-456-7890',
    },
  },
  {
    name: 'Weak Password',
    data: {
      name: 'Bob Wilson',
      email: 'bob@example.com',
      password: 'weak',
      phone: '123-456-7890',
    },
  },
  {
    name: 'Missing Fields',
    data: {
      name: '',
      email: '',
      password: '',
      phone: '',
    },
  },
];

// Run validation examples
console.log('📝 Form Validation Example\n');
console.log('='.repeat(60));

testForms.forEach((testCase, index) => {
  console.log(`\n${index + 1}. ${testCase.name}:`);
  console.log('   Input:', JSON.stringify(testCase.data, null, 6));

  const validation = validateRegistrationForm(testCase.data);

  if (validation.isValid) {
    console.log('   ✅ Form is valid!');
  } else {
    console.log('   ❌ Form has errors:');
    Object.entries(validation.errors).forEach(([field, error]) => {
      console.log(`      - ${field}: ${error}`);
    });
  }
});

console.log('\n' + '='.repeat(60));

module.exports = { validateRegistrationForm };
