# User Management API + WebSocket

This project demonstrates a REST API with WebSocket integration for real-time events.

## Features

- **REST API**
    - Create, Read, Update, Delete users
    - Create and update order status
    - Validation and error handling

- **WebSocket**
    - Emits event when:
        - User is created
        - Order status changes
    - Connect and validate events in real-time

## Installation

```bash
git clone https://github.com/jagruuti/user-management-ws.git
cd user-management
npm install  
```
## Run the server
```bash
node src/app.js
```
• REST API: http://localhost:3000/api/...
• WebSocket: ws://localhost:3000

## API Testing
•	Use Postman or cURL for REST endpoints.
•	Use wscat for WebSocket events:
```bash
npx wscat -c ws://localhost:3000
```
Example: Create user via REST → observe USER_CREATED event in WebSocket.