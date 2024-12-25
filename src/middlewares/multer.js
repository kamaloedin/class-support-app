const multer = require('multer');
const path = require('path');
const studentPhotos = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(appRoot + '/public/img'));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.id}-${req.body.name}.jpg`);
  },
});

module.exports = { studentPhotos };
