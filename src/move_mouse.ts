import robot from 'robotjs';

const moveUp = (y: number) => {
  const position = robot.getMousePos();
  robot.moveMouse(position.x, position.y - y);
};

export { moveUp };
