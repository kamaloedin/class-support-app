const multer = require('multer');
const path = require('path');
const studentPhotos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(appRoot + '/public/img'));
  },
  filename: function (req, file, cb) {
    const timestamp = new Date().getTime();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({
  storage: studentPhotos,
  limits: 10 * 1000 * 1000,
});

module.exports = upload;
