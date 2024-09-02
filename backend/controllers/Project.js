import Project from "../models/ProjectModel.js";
import Users from "../models/UserModel.js";

export const getProjects = async (req, res) => {
    try {
        const response = await Project.findAll({
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const response = await Project.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }]
        });
        if (!response) return res.status(404).json({ msg: "Project not found" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createProject = async (req, res) => {
    const { title, description, images, studentNames, supervisorId } = req.body;
    try {
        await Project.create({
            title: title,
            description: description,
            images: images,
            studentNames: studentNames,
            supervisorId: supervisorId,
            userId: req.userId
        });
        res.status(201).json({ msg: "Project Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            where: { uuid: req.params.id }
        });
        if (!project) return res.status(404).json({ msg: "Project not found" });
        const { title, description, images, studentNames, supervisorId } = req.body;
        await Project.update({
            title: title,
            description: description,
            images: images,
            studentNames: studentNames,
            supervisorId: supervisorId
        }, {
            where: { id: project.id }
        });
        res.status(200).json({ msg: "Project Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            where: { uuid: req.params.id }
        });
        if (!project) return res.status(404).json({ msg: "Project not found" });
        await Project.destroy({
            where: { id: project.id }
        });
        res.status(200).json({ msg: "Project Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
