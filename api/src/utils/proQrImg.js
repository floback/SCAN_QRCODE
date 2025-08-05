const { Jimp } = require("jimp");
const path = require('path');

async function proQrImg(qrBuffer, iconPath) {
  const qrImage = await Jimp.read(qrBuffer);

  if (iconPath) {
    try {
      const iconFullPath = path.resolve(__dirname, '..', '..', 'uploads', 'qrcodImagem', iconPath);
      const iconImage = await Jimp.read(`${iconFullPath}`);
      iconImage.resize(100, 100);

      const x = (qrImage.bitmap.width / 2) - (iconImage.bitmap.width / 2);
      const y = (qrImage.bitmap.height / 2) - (iconImage.bitmap.height / 2);

      qrImage.composite(iconImage, x, y);
    } catch (error) {
      console.warn('Erro ao adicionar ícone ao QR Code:', error.message);
    }
  }

  return await qrImage.getBufferAsync(Jimp.MIME_PNG);
}

module.exports = { proQrImg };
