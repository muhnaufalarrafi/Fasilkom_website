const multer = require('multer');
const path = require('path');

// Set up storage engine for PDF
const pdfStorage = multer.diskStorage({
  destination: './uploads/pdf/',  // Direktori khusus untuk menyimpan file PDF
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Check if file is a PDF
function checkPDFFileType(file, cb) {
  const filetypes = /pdf/;  // Hanya mengizinkan file PDF
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'application/pdf';

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    console.log('File upload error: Only PDFs are allowed');
    cb(new Error('Error: Only PDFs are allowed!'));
  }
}

// Initialize upload middleware for PDF
const uploadPDF = multer({
  storage: pdfStorage,
  limits: { fileSize: 5000000 },  // 5MB limit untuk file PDF
  fileFilter: function (req, file, cb) {
    checkPDFFileType(file, cb);
  }
}).single('pdf');  // Menggunakan 'pdf' sebagai field key untuk upload PDF

// Error handling middleware
const handlePDFUploadErrors = (err, req, res, next) => {
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
  next(); // Proceed if no errors
};

module.exports = { uploadPDF, handlePDFUploadErrors };
