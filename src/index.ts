import { httpServer } from './http_server/index.js';
import WebSocket, { createWebSocketStream, WebSocketServer } from 'ws';
import { moveUp, moveDown, moveLeft, moveRight } from './control/move_mouse.js';
import { getMousePosition } from './control/mouse_position.js';
import { drawCircle, drawRectangle } from './control/drawing.js';
import { getPngBuffer } from './control/screen_image.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// server creation
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws: WebSocket) => {
  console.log('someone connected!');

  const duplex = createWebSocketStream(ws, {
    encoding: 'utf8',
    decodeStrings: false,
  });

  duplex.on('data', async (data) => {
    console.log(data);
    let [action, parameter1, parameter2] = data.split(' ');

    switch (action) {
      case 'mouse_up':
        moveUp(Number(parameter1));
        duplex.write(data);
        break;
      case 'mouse_down':
        moveDown(Number(parameter1));
        duplex.write(data);
        break;
      case 'mouse_left':
        moveLeft(Number(parameter1));
        duplex.write(data);
        break;
      case 'mouse_right':
        moveRight(Number(parameter1));
        duplex.write(data);
        break;
      case 'mouse_position':
        const position = getMousePosition();
        duplex.write(`${data} ${position.x},${position.y}`);
        break;
      case 'draw_rectangle':
        drawRectangle(Number(parameter1), Number(parameter2));
        duplex.write(data);
        break;

      case 'draw_square':
        drawRectangle(Number(parameter1), Number(parameter1));
        duplex.write(data);
        break;

      case 'draw_circle':
        drawCircle(Number(parameter1));
        duplex.write(data);
        break;

      case 'prnt_scrn':
        const base64 = await getPngBuffer();
        duplex.write(`${data} ${base64}`);
        break;

      default:
        break;
    }
  });

  duplex.on('close', () => {
    console.log('websocket stream was closed');
  });

  ws.on('close', () => {
    console.log('ws disconnected!');
  });
});

process.on('SIGINT', () => {
  wss.close();
  process.exit(0);
});
