// controllers/organizationController.js
const Organization = require('../models/Organization');

exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.findAll();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve organizations.' });
  }
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found.' });
    }
    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve organization.' });
  }
};

exports.createOrganization = async (req, res) => {
  try {
    const { personName, positionName } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newOrganization = await Organization.create({
      personName,
      positionName,
      image
    });

    res.status(201).json({ message: 'Organization created successfully', organization: newOrganization });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create organization.' });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found.' });
    }

    const { personName, positionName } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : organization.image;

    organization.personName = personName || organization.personName;
    organization.positionName = positionName || organization.positionName;
    organization.image = image;

    await organization.save();
    res.status(200).json({ message: 'Organization updated successfully', organization });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update organization.' });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByPk(req.params.id);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found.' });
    }

    await organization.destroy();
    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete organization.' });
  }
};
