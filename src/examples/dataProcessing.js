/**
 * Example: Data Processing Pipeline
 * Demonstrates how to use multiple utilities together
 */

const {
  capitalize,
  unique,
  groupBy,
  isValidEmail,
  deepClone,
} = require('../utils');

// Sample data: user records with some duplicates and invalid data
const rawUserData = [
  { name: 'john doe', email: 'john@example.com', role: 'admin' },
  { name: 'jane smith', email: 'invalid-email', role: 'user' },
  { name: 'bob wilson', email: 'bob@example.com', role: 'user' },
  { name: 'john doe', email: 'john@example.com', role: 'admin' },
  { name: 'alice brown', email: 'alice@example.com', role: 'moderator' },
  { name: 'charlie davis', email: 'charlie@example.com', role: 'user' },
];

/**
 * Process and clean user data
 */
function processUserData(data) {
  // Clone the data to avoid mutations
  const workingData = deepClone(data);

  // Step 1: Capitalize names
  const capitalizedData = workingData.map((user) => ({
    ...user,
    name: capitalize(user.name),
  }));

  // Step 2: Filter out invalid emails
  const validUsers = capitalizedData.filter((user) => isValidEmail(user.email));

  // Step 3: Remove duplicates based on email
  const uniqueEmails = unique(validUsers.map((u) => u.email));
  const uniqueUsers = uniqueEmails.map((email) =>
    validUsers.find((u) => u.email === email)
  );

  // Step 4: Group by role
  const groupedByRole = groupBy(uniqueUsers, (user) => user.role);

  return {
    total: uniqueUsers.length,
    users: uniqueUsers,
    byRole: groupedByRole,
  };
}

// Run the example
console.log('🔄 Data Processing Pipeline Example\n');
console.log('Raw data:', rawUserData.length, 'records');
console.log('='.repeat(60));

const result = processUserData(rawUserData);

console.log('\n📊 Processing Results:');
console.log(`Total valid users: ${result.total}`);
console.log('\nUsers by role:');
Object.entries(result.byRole).forEach(([role, users]) => {
  console.log(`  ${role}: ${users.length} user(s)`);
});

console.log('\n✨ Processed users:');
result.users.forEach((user) => {
  console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
});
