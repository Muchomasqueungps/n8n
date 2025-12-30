const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5678;

// Health check endpoint for Hostinger
app.get('/', (req, res) => {
  res.json({
    status: 'running',
    message: 'n8n Server is running on Hostinger',
    version: '2.2.0'
  });
});

// Proxy endpoint to access n8n web UI
app.get('/webhook/*', (req, res) => {
  res.json({ message: 'Webhook endpoint' });
});

app.listen(PORT, () => {
  console.log(`n8n Server is listening on port ${PORT}`);
  
  // Spawn n8n process in background
  const n8nBinary = path.join(__dirname, 'packages', 'cli', 'bin', 'n8n');
  const n8nProcess = spawn('node', [n8nBinary], {
    detached: true,
    stdio: 'ignore'
  });
  n8nProcess.unref();
});
