const path = require('path');
const staticPath = path.resolve('..', process.env.STATIC_PATH, 'images');

module.exports = {
    avatars: path.join(staticPath, 'avatars'),
    contests: path.join(staticPath, 'contests'),
    offers: path.join(staticPath, 'offers')
};