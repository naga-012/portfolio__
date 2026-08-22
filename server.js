const path = require('path');
const express = require('express');
require('dotenv').config();

const app = require('./api/index.js');
const PORT = process.env.PORT || 5000;

// Serve frontend static files locally
app.use(express.static(__dirname));

// Fallback route for SPA
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 BACKEND SERVER RUNNING AT: http://localhost:${PORT}`);
    console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=================================================`);
  });
}

module.exports = app;
