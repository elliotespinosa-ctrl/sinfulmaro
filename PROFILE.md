# User Profile System

This repository includes a user profile management system that stores and manages user preferences, including location information.

## Overview

The user profile is stored in a JSON format that is easy to read and parse by both humans and AI systems. The profile includes:

- User name
- Location (currently set to **Albuquerque**)
- Timezone
- Preferences (theme, language)
- Metadata (timestamps)

## Files

- **`user-profile.json`**: The JSON file containing user profile data
- **`src/profile.js`**: JavaScript module for managing the user profile
- **`tests/profile.test.js`**: Test suite for profile functionality
- **`example.js`**: Example script demonstrating profile usage

## Usage

### Loading the Profile

```javascript
const profile = require('./src/profile');

// Get the complete user profile
const userProfile = profile.getUserProfile();
console.log(userProfile);

// Get just the location
const location = profile.getUserLocation();
console.log(location); // Output: Albuquerque
```

### Updating the Profile

```javascript
const profile = require('./src/profile');

// Update the location
profile.updateUserLocation('New York');

// Update multiple fields
profile.updateUserProfile({
  name: 'John Doe',
  location: 'Albuquerque',
});
```

## Running Tests

```bash
npm test
```

This will verify that:
- The user location is correctly set to "Albuquerque"
- The profile can be loaded successfully
- All required profile fields are present

## Running the Example

```bash
npm run example
```

This will display the current user profile and demonstrate how to access profile information.

## Profile Structure

```json
{
  "user": {
    "name": "Default User",
    "location": "Albuquerque",
    "timezone": "America/Denver",
    "preferences": {
      "theme": "light",
      "language": "en-US"
    },
    "metadata": {
      "createdAt": "2025-12-22T21:36:00.000Z",
      "updatedAt": "2025-12-22T21:36:00.000Z"
    }
  }
}
```

## AI-Friendly Design

The profile system is designed to be easily understood and parsed by AI systems:

1. **Structured JSON Format**: Clear, hierarchical data structure
2. **Descriptive Field Names**: Self-documenting field names
3. **Type Consistency**: Consistent data types throughout
4. **Metadata Tracking**: Timestamps for data provenance
5. **Well-Documented API**: Clear function names and JSDoc comments
