// middleware/upload.js
const multer = require("multer");

// Configure Multer Disk Storage
// diskStorage stores the actual uploaded files directly onto the server disk (uploads/ folder)
const storage = multer.diskStorage({
  // destination defines the folder where incoming uploaded files will be stored
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  // filename generates a unique filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Initialize Multer with our custom storage configuration
const upload = multer({
  storage: storage
});

// Export upload middleware instance to be used in routes
module.exports = upload;

