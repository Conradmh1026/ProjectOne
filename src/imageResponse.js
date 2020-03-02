const fs = require('fs');

const image = fs.readFileSync(`${__dirname}/../client/UFO.jpg`);

//gets the image
const getImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' });
  response.write(image);
  response.end();
};

module.exports.getImage = getImage;
