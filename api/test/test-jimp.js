const importedJimp = require('jimp');
const Jimp = importedJimp.default || importedJimp;

console.log('Jimp.read:', typeof Jimp.read); // ← deve imprimir "function"
