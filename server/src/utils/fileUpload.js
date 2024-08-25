const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { avatars, contests, offers } = require('../config/staticConfig');
const env = process.env.NODE_ENV || 'development';
const prodFilePath = path.resolve('..', 'var', 'www', 'html', 'images');
const devFilePath = path.resolve('..', 'public', 'images');

const filePath = env === 'production' ? prodFilePath : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

function createStorage(destinationPath) {
  return multer.diskStorage({
    destination(req, file, cb) {
      cb(null, destinationPath);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
}

const storageAvatarsFiles = createStorage(avatars);
const storageContestFiles = createStorage(contests);
const storageLogoFiles = createStorage(offers);

const filterImage = (req, file, cb) => {
  const mimeTypeRegex = /^image\/(png|jpeg|gif)$/;
  if(mimeTypeRegex.test(file.mimetype)) {
      cb(null, true);
  } else {
      cb(new Error('Invalid file type. Only PNG, JPEG, and GIF are allowed.'), false);
  }
}

module.exports.uploadAvatar = multer({
  storage: storageAvatarsFiles,
  fileFilter: filterImage,
});
module.exports.uploadContestFiles = multer({
  storage: storageContestFiles,
  fileFilter: filterImage,
})
module.exports.updateContestFile = multer({
  storage: storageContestFiles,
  fileFilter: filterImage
});
module.exports.uploadLogoFiles = multer({
  storage: storageLogoFiles,
  fileFilter: filterImage
});