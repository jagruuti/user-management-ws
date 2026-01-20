import { test, expect } from '@playwright/test';
import WebSocket from 'ws';

test('WebSocket emits USER_CREATED event', async () => {
  // Connect to WS
  const ws = new WebSocket('ws://localhost:3000');

  // Wait for event
  const message = new Promise((resolve) => {
    ws.on('message', (msg) => resolve(JSON.parse(msg)));
  });

  // Create user via API
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'WebSocket Test', email: 'ws@test.com' }),
  });

  expect(response.status).toBe(201);

  // Validate WebSocket event
  const event = await message;
  expect(event.event).toBe('USER_CREATED');
  expect(event.data.name).toBe('WebSocket Test');

  ws.close();
});