// controllers/projectController.js
const Project = require('../models/Projects');

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
};

// GET project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve project.' });
  }
};

// CREATE new project (Admin only)
exports.createProject = async (req, res) => {
  const { title, description, studentNames } = req.body;

  // Debugging: Log file dan body request
  console.log('req.files:', req.files);
  console.log('req.body:', req.body);

  try {
    const newProject = await Project.create({
      title,
      description,
      studentNames,
      images: req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null,
      pdfLink: req.files['pdf'] ? `/uploads/pdf/${req.files['pdf'][0].filename}` : null
    });
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);  // Tambahkan logging error
    res.status(500).json({ error: 'Failed to create project.' });
  }
};

// UPDATE project (Admin only)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    const { title, description, studentNames } = req.body;
    const image = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : project.images;
    const pdfLink = req.files['pdf'] ? `/uploads/pdf/${req.files['pdf'][0].filename}` : project.pdfLink;

    await project.update({
      title,
      description,
      studentNames,
      images: image,
      pdfLink: pdfLink,
    });

    res.status(200).json({ message: 'Project updated successfully.', project });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project.' });
  }
};

// DELETE project (Admin only)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
};
