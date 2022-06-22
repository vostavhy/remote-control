import Jimp from 'jimp';
import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';
import { moveUp } from './move_mouse.js';

const HTTP_PORT = 3005;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// server creation
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('someone connected!');

  ws.on('message', (data) => {
    console.log(`${data}`);

    switch (String(data).split(' ')[0]) {
      case 'mouse_up':
        console.log('mouse_up');
        console.log(String(data).split(' '));
        moveUp(Number(String(data).split(' ')[1]));
        ws.send(`${data}`);
        break;
      default:
        break;
    }
  });
});

wss.on('close', () => {
  console.log('\nws disconnected!');
});

process.on('SIGINT', () => {
  wss.close();
  process.exit(0);
});
