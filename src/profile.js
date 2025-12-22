/**
 * User Profile Management Module
 * Manages user profile data including location preferences
 */

const fs = require('fs');
const path = require('path');

const PROFILE_PATH = path.join(__dirname, '..', 'user-profile.json');

/**
 * Loads the user profile from the JSON file
 * @returns {Object} The user profile object
 */
function loadProfile() {
  try {
    const data = fs.readFileSync(PROFILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to load user profile: ${error.message}`);
  }
}

/**
 * Saves the user profile to the JSON file
 * @param {Object} profile - The profile object to save
 */
function saveProfile(profile) {
  try {
    const data = JSON.stringify(profile, null, 2);
    fs.writeFileSync(PROFILE_PATH, data, 'utf8');
  } catch (error) {
    throw new Error(`Failed to save user profile: ${error.message}`);
  }
}

/**
 * Gets the user's current location
 * @returns {string} The user's location
 */
function getUserLocation() {
  const profile = loadProfile();
  return profile.user.location;
}

/**
 * Updates the user's location
 * @param {string} location - The new location
 */
function updateUserLocation(location) {
  const profile = loadProfile();
  profile.user.location = location;
  profile.user.metadata.updatedAt = new Date().toISOString();
  saveProfile(profile);
}

/**
 * Gets the complete user profile
 * @returns {Object} The user profile
 */
function getUserProfile() {
  return loadProfile();
}

/**
 * Updates the user profile
 * @param {Object} updates - Object containing fields to update
 */
function updateUserProfile(updates) {
  const profile = loadProfile();
  profile.user = { ...profile.user, ...updates };
  profile.user.metadata.updatedAt = new Date().toISOString();
  saveProfile(profile);
}

module.exports = {
  loadProfile,
  saveProfile,
  getUserLocation,
  updateUserLocation,
  getUserProfile,
  updateUserProfile,
};
