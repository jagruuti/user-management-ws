const express = require('express');
const http = require('http');

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');
const { startWebSocketServer } = require('./websocket/socketServer');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Global error handler
app.use(errorHandler);

// Create HTTP server
const PORT = 3000;
const server = http.createServer(app);

// Start WebSocket server (IMPORTANT: before listen)
startWebSocketServer(server);

// Start HTTP server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});