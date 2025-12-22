# sinfulmaro

## ShiftSmart Turnaway Tool

A mobile-optimized web application for iPhone 15 that helps track and document ShiftSmart turnaways.

### Features

- **Quick Logging**: Easily log turnaways with date, location, reason, and compensation details
- **Statistics Dashboard**: View total turnaways, monthly count, and compensation statistics
- **Export Capabilities**: Export your turnaway records as JSON or text format
- **Offline Support**: Works offline as a Progressive Web App (PWA)
- **iPhone Optimized**: Designed specifically for iPhone 15 with native iOS styling

### How to Use

#### Option 1: Web Browser (Quick Start)
1. Open Safari on your iPhone 15
2. Navigate to the hosted URL (or open `index.html` directly)
3. Start logging turnaways immediately

#### Option 2: Add to Home Screen (Recommended)
1. Open the tool in Safari
2. Tap the Share button (square with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to confirm
5. The app will now appear on your home screen like a native app

### Features Breakdown

#### Log Turnaway
- **Date & Time**: Automatically set to current time (adjustable)
- **Location**: Store or facility name
- **Reason**: Choose from common turnaway reasons:
  - Overstaffed
  - Shift Cancelled
  - Early Release
  - Not Needed
  - Schedule Error
  - Other
- **Notes**: Add additional details, contact person, or other information
- **Compensation**: Track if you received payment:
  - None
  - Partial Pay
  - Full Pay
  - Pending

#### Statistics
- Total turnaways logged
- Turnaways this month
- Number of compensated turnaways

#### Export Data
- **Export JSON**: Download all data in JSON format for backup or analysis
- **Export Text**: Download a formatted text report of all turnaways

### Local Development

To run locally:

1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
4. Navigate to `http://localhost:8000`

### Data Storage

All data is stored locally in your browser's localStorage. Your turnaway records stay on your device and are never sent to any server.

### Browser Compatibility

- **Primary**: Safari on iOS 15+ (iPhone 15)
- **Also Works**: Chrome, Firefox, Edge (modern versions)

### Technical Stack

- Pure HTML5, CSS3, and JavaScript
- No frameworks or dependencies
- Progressive Web App (PWA) enabled
- Responsive design optimized for iPhone 15

### Privacy

This tool stores all data locally on your device. No information is transmitted to external servers.
