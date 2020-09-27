const multer = require("multer");
const crypto = require("crypto");
const mime = require("mime"); //extention fille

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        raw.toString("hex") + Date.now() + "." + mime.extension(file.mimetype)
      );
    });
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
