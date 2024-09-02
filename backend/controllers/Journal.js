import Journal from "../models/JournalModel.js";
import Users from "../models/UserModel.js";

export const getJournals = async (req, res) => {
    try {
        const response = await Journal.findAll({
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

export const getJournalById = async (req, res) => {
    try {
        const response = await Journal.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }]
        });
        if (!response) return res.status(404).json({ msg: "Journal not found" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createJournal = async (req, res) => {
    const { title, authors, abstract, downloadLink, uploadDate } = req.body;
    try {
        await Journal.create({
            title: title,
            authors: authors,
            abstract: abstract,
            downloadLink: downloadLink,
            uploadDate: uploadDate,
            userId: req.userId
        });
        res.status(201).json({ msg: "Journal Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateJournal = async (req, res) => {
    try {
        const journal = await Journal.findOne({
            where: { uuid: req.params.id }
        });
        if (!journal) return res.status(404).json({ msg: "Journal not found" });
        const { title, authors, abstract, downloadLink, uploadDate } = req.body;
        await Journal.update({
            title: title,
            authors: authors,
            abstract: abstract,
            downloadLink: downloadLink,
            uploadDate: uploadDate
        }, {
            where: { id: journal.id }
        });
        res.status(200).json({ msg: "Journal Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteJournal = async (req, res) => {
    try {
        const journal = await Journal.findOne({
            where: { uuid: req.params.id }
        });
        if (!journal) return res.status(404).json({ msg: "Journal not found" });
        await Journal.destroy({
            where: { id: journal.id }
        });
        res.status(200).json({ msg: "Journal Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
