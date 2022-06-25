import Jimp from 'jimp';
import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';
import { moveUp, moveDown, moveLeft, moveRight } from './move_mouse.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// server creation
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('someone connected!');

  ws.on('message', (data) => {
    console.log(`${data}`);
    let [action, parameter] = String(data).split(' ');

    switch (action) {
      case 'mouse_up':
        console.log('mouse_up');
        moveUp(Number(parameter));
        ws.send(`${data}`);
        break;
      case 'mouse_down':
        console.log('mouse_down');
        moveDown(Number(parameter));
        ws.send(`${data}`);
        break;
      case 'mouse_left':
        console.log('mouse_left');
        moveLeft(Number(parameter));
        ws.send(`${data}`);
        break;
      case 'mouse_right':
        console.log('mouse_right');
        moveRight(Number(parameter));
        ws.send(`${data}`);
        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    console.log('ws disconnected!');
  });
});

process.on('SIGINT', () => {
  wss.close();
  process.exit(0);
});
