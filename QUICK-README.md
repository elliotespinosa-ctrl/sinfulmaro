# Quickly - Quick Notes CLI Tool

A simple, fast command-line tool for capturing notes quickly.

## Features

- ✨ Add notes instantly from the command line
- 📝 List all your quick notes with timestamps
- 🗑️ Clear notes when needed
- 💾 Local JSON storage (no server required)

## Installation

```bash
# Clone the repository
git clone https://github.com/elliotespinosa-ctrl/sinfulmaro.git
cd sinfulmaro
```

## Usage

### Add a note quickly
```bash
node quick.js add "Remember to buy milk"
```

### List all notes
```bash
node quick.js list
```

### Clear all notes
```bash
node quick.js clear
```

### Display help
```bash
node quick.js
```

## Examples

```bash
# Add a quick reminder
$ node quick.js add "Call mom at 3pm"
✓ Note added quickly!

# Add a quick idea
$ node quick.js add "App idea: quick grocery list"
✓ Note added quickly!

# View your notes
$ node quick.js list

Your Quick Notes:
──────────────────────────────────────────────────
1. [12/22/2025, 9:12:00 PM]
   Call mom at 3pm

2. [12/22/2025, 9:12:05 PM]
   App idea: quick grocery list

# Clear when done
$ node quick.js clear
✓ All notes cleared!
```

## File Storage

Notes are stored in `quick-notes.json` in the project directory. This file is automatically created when you add your first note.

## Requirements

- Node.js (v12 or higher)

## License

MIT
