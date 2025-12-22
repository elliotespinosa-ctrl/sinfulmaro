#!/usr/bin/env node

/**
 * Example script demonstrating user profile functionality
 * This shows how to interact with the user profile system
 */

const profile = require('./src/profile');

console.log('='.repeat(50));
console.log('User Profile Example');
console.log('='.repeat(50));

// Display current user profile
console.log('\nCurrent User Profile:');
const userProfile = profile.getUserProfile();
console.log(JSON.stringify(userProfile, null, 2));

// Display just the location
console.log('\n' + '-'.repeat(50));
console.log(`User Location: ${profile.getUserLocation()}`);
console.log('-'.repeat(50));

// Demonstrate the profile is AI-readable
console.log('\nAI-Friendly Profile Information:');
console.log('--------------------------------');
console.log(`Name: ${userProfile.user.name}`);
console.log(`Location: ${userProfile.user.location}`);
console.log(`Timezone: ${userProfile.user.timezone}`);
console.log(`Language: ${userProfile.user.preferences.language}`);
console.log(`Theme: ${userProfile.user.preferences.theme}`);
console.log(`Last Updated: ${userProfile.user.metadata.updatedAt}`);

console.log('\n' + '='.repeat(50));
console.log('✓ Profile successfully loaded and displayed');
console.log('='.repeat(50));
