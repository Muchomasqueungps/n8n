#!/usr/bin/env node

// Entry point for n8n deployment on Hostinger
// This file loads the n8n CLI from the packages/cli directory

const path = require('path');
const { spawn } = require('child_process');

// Find the n8n binary
const n8nBinary = path.join(__dirname, 'packages', 'cli', 'bin', 'n8n');

// Execute the n8n binary with all arguments passed to this script
const proc = spawn('node', [n8nBinary, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true
});

proc.on('exit', (code) => {
  process.exit(code);
});

proc.on('error', (err) => {
  console.error('Failed to start n8n:', err);
  process.exit(1);
});
