/**
 * User Profile Tests
 * Tests for the user profile management functionality
 */

const profile = require('../src/profile');

/**
 * Test: Verify user location is set to Albuquerque
 */
function testUserLocationIsAlbuquerque() {
  console.log('Test: Checking if user location is Albuquerque...');
  const location = profile.getUserLocation();
  
  if (location === 'Albuquerque') {
    console.log('✓ PASS: User location is correctly set to Albuquerque');
    return true;
  } else {
    console.log(`✗ FAIL: Expected "Albuquerque", got "${location}"`);
    return false;
  }
}

/**
 * Test: Verify complete profile can be loaded
 */
function testLoadUserProfile() {
  console.log('\nTest: Loading complete user profile...');
  const userProfile = profile.getUserProfile();
  
  if (userProfile && userProfile.user && userProfile.user.location) {
    console.log('✓ PASS: User profile loaded successfully');
    console.log('  Profile data:', JSON.stringify(userProfile.user, null, 2));
    return true;
  } else {
    console.log('✗ FAIL: Failed to load user profile');
    return false;
  }
}

/**
 * Test: Verify profile structure
 */
function testProfileStructure() {
  console.log('\nTest: Verifying profile structure...');
  const userProfile = profile.getUserProfile();
  const user = userProfile.user;
  
  const requiredFields = ['name', 'location', 'timezone', 'preferences', 'metadata'];
  const missingFields = requiredFields.filter(field => !(field in user));
  
  if (missingFields.length === 0) {
    console.log('✓ PASS: Profile has all required fields');
    return true;
  } else {
    console.log(`✗ FAIL: Profile is missing fields: ${missingFields.join(', ')}`);
    return false;
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('==========================================');
  console.log('Running User Profile Tests');
  console.log('==========================================\n');
  
  const tests = [
    testUserLocationIsAlbuquerque,
    testLoadUserProfile,
    testProfileStructure,
  ];
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach(test => {
    if (test()) {
      passed++;
    } else {
      failed++;
    }
  });
  
  console.log('\n==========================================');
  console.log(`Test Results: ${passed} passed, ${failed} failed`);
  console.log('==========================================');
  
  return failed === 0;
}

// Run tests if this file is executed directly
if (require.main === module) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}

module.exports = {
  testUserLocationIsAlbuquerque,
  testLoadUserProfile,
  testProfileStructure,
  runAllTests,
};
