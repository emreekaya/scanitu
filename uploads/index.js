const multer = require('multer');
const path = require('path');

// Dosya yükleme konfigürasyonu
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dosyaların yükleneceği dizin
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Dosya adını belirleyin
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
