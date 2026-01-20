const { test, expect } = require('@playwright/test');
const WebSocket = require('ws');

test('WebSocket should emit USER_CREATED event on user creation', async ({ request }) => {
  let wsMessage = null;

  // Connect to WebSocket
  const ws = new WebSocket('ws://localhost:8080');

  // Listen for messages
  ws.on('message', (data) => {
    wsMessage = JSON.parse(data.toString());
  });

  // Wait for WebSocket to open
  await new Promise((resolve) => ws.on('open', resolve));

  // Send API request to create user
  const newUser = { name: 'WS Test User', email: 'wsuser@test.com' };
  const response = await request.post('/api/users', {
    data: newUser,
  });

  expect(response.status()).toBe(201);
  const body = await response.json();

  // Wait for WebSocket message (max 1 second)
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('WebSocket event not received')), 1000);
    ws.on('message', (data) => {
      clearTimeout(timeout);
      wsMessage = JSON.parse(data.toString());
      resolve();
    });
  });

  // Validate WebSocket event
  expect(wsMessage).not.toBeNull();
  expect(wsMessage.event).toBe('USER_CREATED');
  expect(wsMessage.payload).toMatchObject({
    id: body.id,
    name: newUser.name,
    email: newUser.email,
  });

  ws.close();
});