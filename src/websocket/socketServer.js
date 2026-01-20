const WebSocket = require('ws');

let wss;

const startWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  console.log('WebSocket server attached to HTTP server');
};

const emitEvent = (event, payload) => {
console.log('EMITTING EVENT:', event);
  if (!wss) {
      console.log('WS NOT INITIALIZED');
  return;
  }

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ event, payload }));
    }
  });
};

module.exports = { startWebSocketServer, emitEvent };