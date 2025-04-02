import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as whoopRouter } from './routes/whoop.js';
import { router as mcpRouter } from './routes/mcp.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the WHOOP MCP Server!',
    version: '1.0.0',
    endpoints: {
      '/whoop': 'WHOOP API integration endpoints',
      '/mcp': 'MCP protocol endpoints'
    }
  });
});

// Routes
app.use('/whoop', whoopRouter);
app.use('/mcp', mcpRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MCP endpoint available at http://localhost:${PORT}/mcp`);
  console.log(`WHOOP API endpoints available at http://localhost:${PORT}/whoop`);
});
