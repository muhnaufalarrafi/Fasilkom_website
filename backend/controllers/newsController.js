// controllers/newsController.js
const News = require('../models/News');

// GET all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve news.' });
  }
};

// GET news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve news.' });
  }
};

// CREATE new news (Admin only)
exports.createNews = async (req, res) => {
    // Debugging log
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
  
    // Membersihkan dan memastikan key 'date' terbaca dengan benar
    const { title, content } = req.body;
    const date = req.body.date || req.body['date\t'];  // Pastikan kita memeriksa adanya karakter tab
  
    if (!date) {
      console.log('Date field is missing or undefined:', req.body);
      return res.status(400).json({ error: 'Date is missing or undefined.' });
    }
  
    // Mengonversi date menggunakan native JavaScript Date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
  
    try {
      const newNews = await News.create({
        title,
        content,
        date: parsedDate,  // Simpan tanggal yang sudah diparsing
        image: req.file ? `/uploads/${req.file.filename}` : null
      });
      
      return res.status(201).json({ message: 'News created successfully', news: newNews });
    } catch (error) {
      console.error('News creation error:', error.message);
      return res.status(500).json({ error: 'Failed to create news.' });
    }
  };
  
// UPDATE news (Admin only)
exports.updateNews = async (req, res) => {
    try {
      const news = await News.findByPk(req.params.id);
      if (!news) {
        return res.status(404).json({ error: 'News not found.' });
      }
  
      const { title, content, date } = req.body;
  
      // Jika ada file baru yang diunggah, gunakan gambar baru, jika tidak tetap gunakan gambar lama
      const image = req.file ? `/uploads/${req.file.filename}` : news.image;
  
      // Update news fields
      news.title = title || news.title;
      news.content = content || news.content;
      news.date = date ? new Date(date) : news.date;
      news.image = image;
  
      // Simpan perubahan
      await news.save();
  
      res.status(200).json({ message: 'News updated successfully', news });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update news.' });
    }
  };
    
// DELETE news (Admin only)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found.' });
    }

    await news.destroy();
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news.' });
  }
};
