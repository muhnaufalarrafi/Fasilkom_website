const Discussion = require('../models/Discussion');

exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.findAll();
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve discussions.' });
  }
};

exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found.' });
    }
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve discussion.' });
  }
};

exports.createDiscussion = async (req, res) => {
  const { title, content } = req.body;

  // Collect all uploaded file names (multiple images)
  const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  try {
    const newDiscussion = await Discussion.create({
      title,
      content,
      images: images.length ? JSON.stringify(images) : null, // Convert images array to JSON
      author: req.user.username // Automatically assign author from the token
    });
    res.status(201).json({ message: 'Discussion created successfully', discussion: newDiscussion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create discussion.' });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found.' });
    }

    const { title, content } = req.body;
    
    // Collect all uploaded file names (multiple images)
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : JSON.parse(discussion.images);

    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;
    discussion.images = JSON.stringify(images);

    await discussion.save();
    res.status(200).json({ message: 'Discussion updated successfully', discussion });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update discussion.' });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found.' });
    }

    await discussion.destroy();
    res.status(200).json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete discussion.' });
  }
};
