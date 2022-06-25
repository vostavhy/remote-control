import robot from 'robotjs';
import Jimp from 'jimp';
import path from 'path';

const getPngBuffer = async () => {
  const __dirname = path.resolve(path.dirname(''));
  const img = robot.screen.capture(0, 0, 200, 200);
  const data = [];
  const bitmap = img.image;
  for (let i = 0; i < bitmap.length; i += 4) {
    data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3]);
  }

  const jimp = new Jimp(
    {
      data: new Uint8Array(data),
      width: img.width,
      height: img.height,
    },
    async function (err: Error, image: Jimp) {
      if (err) {
        console.log(err);
      } else {
        image.write(__dirname + '/data/screen.png');
      }
    }
  );

  const base64 = await jimp.getBase64Async(Jimp.MIME_PNG);
  return base64.split(',')[1];
};

export { getPngBuffer };
