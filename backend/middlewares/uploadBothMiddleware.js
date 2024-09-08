const multer = require('multer');
const path = require('path');

// Set up storage engine for PDF and images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, './uploads/pdf/'); // Simpan PDF di folder uploads/pdf/
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, './uploads/img'); // Simpan gambar di folder uploads/
    } else {
      cb(new Error('Invalid file type. Only PDFs and images are allowed.'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// File filter untuk cek jenis file (PDF dan gambar)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDFs and images are allowed.'));
  }
};

// Inisialisasi multer untuk handle PDF dan gambar
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },  // Batas ukuran file 5MB
  fileFilter: fileFilter
}).fields([
  { name: 'pdf', maxCount: 1 },  // Menerima 1 file PDF
  { name: 'image', maxCount: 1 }  // Menerima 1 file gambar
]);

// Middleware untuk error handling
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds the limit of 5MB.' });
    }
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    // Handle unknown errors
    return res.status(400).json({ error: err.message });
  }
  next(); // Lanjutkan jika tidak ada error
};

module.exports = { upload, handleUploadErrors };
