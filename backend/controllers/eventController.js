// controllers/eventController.js
const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events.' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event.' });
  }
};

exports.createEvent = async (req, res) => {
  // Debugging log
  console.log('Request body:', req.body);
  console.log('Request file:', req.file);

  // Membersihkan dan memastikan key 'date' terbaca dengan benar
  const { title, description, time, location } = req.body;
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
    const newEvent = await Event.create({
      title,
      description,
      date: parsedDate,
      time,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });
    return res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Event creation error:', error.message);
    return res.status(500).json({ error: 'Failed to create event.' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const { title, description, date, time, location } = req.body;
    
    // Jika ada file baru yang diunggah, gunakan gambar baru, jika tidak tetap gunakan gambar lama
    const image = req.file ? `/uploads/${req.file.filename}` : event.image;

    // Update event fields
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date ? new Date(date) : event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.image = image;

    await event.save();
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event.' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    await event.destroy();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event.' });
  }
};
