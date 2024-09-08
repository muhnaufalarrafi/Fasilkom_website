// controllers/journalController.js
const Journal = require('../models/Journals');

// GET all journals
exports.getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.findAll();
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve journals.' });
  }
};

// GET journal by ID
exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findByPk(req.params.id);
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found.' });
    }
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve journal.' });
  }
};

// CREATE new journal (Admin only)
exports.createJournal = async (req, res) => {
  const { title, authors, abstract, uploadDate, downloadLink } = req.body;

  try {
    const newJournal = await Journal.create({
      title,
      authors,
      abstract,
      uploadDate: new Date(uploadDate),
      downloadLink
    });
    res.status(201).json({ message: 'Journal created successfully', journal: newJournal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create journal.' });
  }
};

// UPDATE journal (Admin only)
exports.updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findByPk(req.params.id);
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found.' });
    }

    const { title, authors, abstract, uploadDate, downloadLink } = req.body;
    journal.title = title || journal.title;
    journal.authors = authors || journal.authors;
    journal.abstract = abstract || journal.abstract;
    journal.uploadDate = uploadDate ? new Date(uploadDate) : journal.uploadDate;
    journal.downloadLink = downloadLink || journal.downloadLink;

    await journal.save();
    res.status(200).json({ message: 'Journal updated successfully', journal });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update journal.' });
  }
};

// DELETE journal (Admin only)
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findByPk(req.params.id);
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found.' });
    }

    await journal.destroy();
    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete journal.' });
  }
};
