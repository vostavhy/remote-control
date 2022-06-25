import robot from 'robotjs';

//robot.setMouseDelay(2000);

const drawRectangle = (width: number, length: number) => {
  robot.mouseToggle('down');
  slowDrag(width, 0);
  slowDrag(0, length);
  slowDrag(-width, 0);
  slowDrag(0, -length);
  robot.mouseToggle('up');
};

const slowDrag = (moveX: number, moveY: number) => {
  let { x, y } = robot.getMousePos();
  if (moveX) {
    const partition = moveX / 100;
    for (let i = 0; i <= 100; i++) {
      x += partition;
      robot.dragMouse(x, y);
    }
  } else if (moveY) {
    const partition = moveY / 100;
    for (let i = 0; i <= 100; i++) {
      y += partition;
      robot.dragMouse(x, y);
    }
  }
};

const drawCircle = (radius: number) => {
  robot.mouseToggle('down');
  const { x, y } = robot.getMousePos();
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const newX = x + radius * Math.cos(i) - radius;
    const newY = y + radius * Math.sin(i);
    robot.dragMouse(newX, newY);
  }
  robot.mouseToggle('up');
};

export { drawRectangle, drawCircle };
