import Jimp from 'jimp';
import { httpServer } from './http_server/index.js';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';
import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  getMousePosition,
} from './move_mouse.js';
import { drawCircle, drawRectangle } from './drawing.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// server creation
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws: WebSocket) => {
  console.log('someone connected!');

  ws.on('message', (data) => {
    console.log(`${data}`);
    let [action, parameter1, parameter2] = String(data).split(' ');

    switch (action) {
      case 'mouse_up':
        console.log('mouse_up');
        moveUp(Number(parameter1));
        ws.send(`${data}`);
        break;
      case 'mouse_down':
        console.log('mouse_down');
        moveDown(Number(parameter1));
        ws.send(`${data}`);
        break;
      case 'mouse_left':
        console.log('mouse_left');
        moveLeft(Number(parameter1));
        ws.send(`${data}`);
        break;
      case 'mouse_right':
        console.log('mouse_right');
        moveRight(Number(parameter1));
        ws.send(`${data}`);
        break;
      case 'mouse_position':
        console.log('mouse_position');
        const position = getMousePosition();
        ws.send(`${data} ${position.x},${position.y}`);
        break;
      case 'draw_rectangle':
        console.log('draw_rectangle');
        drawRectangle(Number(parameter1), Number(parameter2));
        ws.send(`${data}`);
        break;

      case 'draw_square':
        console.log('draw_square');
        drawRectangle(Number(parameter1), Number(parameter1));
        ws.send(`${data}`);
        break;

      case 'draw_circle':
        console.log('draw_circle');
        drawCircle(Number(parameter1));
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
