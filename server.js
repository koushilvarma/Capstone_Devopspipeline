const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Middleware
app.use(express.json());

// Health check endpoint (used by Kubernetes liveness/readiness probes)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Readiness probe endpoint
app.get('/ready', (req, res) => {
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOps Demo App v1.1.0</title>
        <style>
          :root { --bg: #0d1117; --card: #161b22; --accent: #238636; --text: #c9d1d9; }
          body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .card { background: var(--card); border: 1px solid #30363d; border-radius: 12px; padding: 2.5rem; max-width: 520px; width: 90%; box-shadow: 0 8px 24px rgba(0,0,0,0.5); text-align: center; }
          .badge { background: #238636; color: white; padding: 4px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; display: inline-block; margin-bottom: 1rem; }
          h1 { color: #58a6ff; margin-top: 0; font-size: 1.8rem; }
          p { font-size: 1rem; color: #8b949e; line-height: 1.5; }
          .info { background: #0d1117; border-radius: 8px; padding: 1rem 1.25rem; text-align: left; font-family: monospace; font-size: 0.9rem; margin-top: 1.5rem; line-height: 1.7; border: 1px solid #30363d; }
          .status { color: #3fb950; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">v1.1.0 — Jenkins CI/CD Build 🎉</div>
          <h1>🚀 DevOps Demo App</h1>
          <p>Website successfully updated and deployed via automated pipeline!</p>
          <div class="info">
            <div><strong>Status:</strong> <span class="status">HEALTHY ✅</span></div>
            <div><strong>Version:</strong> 1.1.0</div>
            <div><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</div>
            <div><strong>Host:</strong> ${require('os').hostname()}</div>
            <div><strong>Timestamp:</strong> ${new Date().toISOString()}</div>
          </div>
        </div>
      </body>
      </html>
    `);
  }
  res.status(200).json({
    message: '🎉 DevOps Demo App v1.1.0 is running!',
    version: '1.1.0',
    environment: process.env.NODE_ENV || 'development',
    hostname: require('os').hostname(),
    timestamp: new Date().toISOString(),
  });
});

// Info endpoint
app.get('/info', (req, res) => {
  res.status(200).json({
    app: 'devops-demo',
    version: '1.0.0',
    node: process.version,
    platform: process.platform,
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV || 'development',
  });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🐳 Ready for Docker & Kubernetes deployment`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});
