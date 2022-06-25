import robot from 'robotjs';

const moveUp = (y: number) => {
  const position = robot.getMousePos();
  robot.moveMouse(position.x, position.y - y);
};

const moveDown = (y: number) => {
  const position = robot.getMousePos();
  robot.moveMouse(position.x, position.y + y);
};

const moveLeft = (x: number) => {
  const position = robot.getMousePos();
  robot.moveMouse(position.x - x, position.y);
};

const moveRight = (x: number) => {
  const position = robot.getMousePos();
  robot.moveMouse(position.x + x, position.y);
};

export { moveUp, moveDown, moveLeft, moveRight };
