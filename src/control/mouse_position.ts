import robot from 'robotjs';

export const getMousePosition = () => {
  const position = robot.getMousePos();
  return position;
};
