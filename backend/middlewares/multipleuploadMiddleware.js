const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/img',
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check file type function
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    console.log('File upload error: Only images are allowed');
    cb(new Error('Error: Images only!'));
  }
}

// Initialize upload middleware for multiple files
const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB limit per image
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 5); // Allow up to 5 images to be uploaded

// Error handling middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds the limit of 2MB.' });
    }
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { uploadMultiple, handleUploadErrors };
