import { test, expect } from '@playwright/test';
import WebSocket from 'ws';

const BASE_URL = 'http://localhost:3000';

function waitForEvent(ws) {
  return new Promise(resolve => {
    ws.on('message', msg => resolve(JSON.parse(msg)));
  });
}

test('WebSocket emits ORDER_STATUS_CHANGED event', async () => {
  const ws = new WebSocket('ws://localhost:3000');
  await new Promise(res => ws.on('open', res));

  // Create order
  const createRes = await fetch(`${BASE_URL}/api/orders`, { method: 'POST' });
  const order = await createRes.json();

  const eventPromise = waitForEvent(ws);

  // Update order status
  const updateRes = await fetch(`${BASE_URL}/api/orders/${order.id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'SHIPPED' })
  });

  expect(updateRes.status).toBe(200);

  const event = await eventPromise;
  expect(event.event).toBe('ORDER_STATUS_CHANGED');
  expect(event.data.status).toBe('SHIPPED');

  ws.close();
});