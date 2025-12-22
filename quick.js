#!/usr/bin/env node

/**
 * Quick - A simple command-line tool for quick note-taking
 * Usage: node quick.js add "your note"
 *        node quick.js list
 *        node quick.js clear
 */

const fs = require('fs');
const path = require('path');

const NOTES_FILE = path.join(__dirname, 'quick-notes.json');

// Initialize notes file if it doesn't exist
function initNotesFile() {
  if (!fs.existsSync(NOTES_FILE)) {
    try {
      fs.writeFileSync(NOTES_FILE, JSON.stringify({ notes: [] }, null, 2));
    } catch (error) {
      console.error('Error: Unable to create notes file:', error.message);
      process.exit(1);
    }
  }
}

// Read notes from file
function readNotes() {
  initNotesFile();
  try {
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error: Unable to read notes file:', error.message);
    console.error('The notes file may be corrupted. Creating a fresh file...');
    try {
      fs.writeFileSync(NOTES_FILE, JSON.stringify({ notes: [] }, null, 2));
      return { notes: [] };
    } catch (writeError) {
      console.error('Error: Unable to create new notes file:', writeError.message);
      process.exit(1);
    }
  }
}

// Write notes to file
function writeNotes(data) {
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error: Unable to save notes:', error.message);
    console.error('Please check disk space and file permissions.');
    process.exit(1);
  }
}

// Add a new note
function addNote(note) {
  const data = readNotes();
  data.notes.push({
    id: Date.now(),
    text: note,
    timestamp: new Date().toISOString()
  });
  writeNotes(data);
  console.log('✓ Note added quickly!');
}

// List all notes
function listNotes() {
  const data = readNotes();
  if (data.notes.length === 0) {
    console.log('No notes yet. Add one quickly!');
    return;
  }
  
  console.log('\nYour Quick Notes:');
  console.log('─'.repeat(50));
  data.notes.forEach((note, index) => {
    const date = new Date(note.timestamp).toLocaleString();
    console.log(`${index + 1}. [${date}]`);
    console.log(`   ${note.text}`);
    console.log();
  });
}

// Clear all notes
function clearNotes() {
  writeNotes({ notes: [] });
  console.log('✓ All notes cleared!');
}

// Main command handler
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('Quick Notes - Fast command-line note-taking');
  console.log('\nUsage:');
  console.log('  node quick.js add "your note"  - Add a note quickly');
  console.log('  node quick.js list             - List all notes');
  console.log('  node quick.js clear            - Clear all notes');
  process.exit(0);
}

switch (command.toLowerCase()) {
  case 'add':
    const note = args.slice(1).join(' ');
    if (!note) {
      console.error('Error: Please provide a note to add');
      process.exit(1);
    }
    addNote(note);
    break;
  
  case 'list':
    listNotes();
    break;
  
  case 'clear':
    clearNotes();
    break;
  
  default:
    console.error(`Unknown command: ${command}`);
    console.log('Use: add, list, or clear');
    process.exit(1);
}
