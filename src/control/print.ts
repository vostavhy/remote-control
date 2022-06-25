import robot from 'robotjs';
import Jimp from 'jimp';
import path from 'path';

const getPngBuffer = async () => {
  const { x, y } = robot.getMousePos();
  const bitmap = robot.screen.capture(x - 100, y - 100, 200, 200);
  const data = [];
  const rawImage = bitmap.image;
  for (let i = 0; i < rawImage.length; i += 4) {
    data.push(rawImage[i + 2], rawImage[i + 1], rawImage[i], rawImage[i + 3]);
  }

  const jimp = new Jimp({
    data: new Uint8Array(data),
    width: bitmap.width,
    height: bitmap.height,
  });

  const base64 = await jimp.getBase64Async(Jimp.MIME_PNG);
  return base64.split(',')[1];
};

export { getPngBuffer };
