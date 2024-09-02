import { validationResult } from "express-validator";
import News from "../models/NewsModel.js";
import Users from "../models/UserModel.js";

export const getNews = async (req, res) => {
    try {
        const response = await News.findAll({
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

export const getNewsById = async (req, res) => {
    try {
        const response = await News.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }]
        });
        if (!response) return res.status(404).json({ msg: "News not found" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createNews = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, date, image } = req.body;
    try {
        await News.create({
            title: title,
            content: content,
            date: date,
            image: image,
            userId: req.userId
        });
        res.status(201).json({ msg: "News Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateNews = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const news = await News.findOne({
            where: { uuid: req.params.id }
        });
        if (!news) return res.status(404).json({ msg: "News not found" });
        const { title, content, date, image } = req.body;
        await News.update({
            title: title,
            content: content,
            date: date,
            image: image
        }, {
            where: { id: news.id }
        });
        res.status(200).json({ msg: "News Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteNews = async (req, res) => {
    try {
        const news = await News.findOne({
            where: { uuid: req.params.id }
        });
        if (!news) return res.status(404).json({ msg: "News not found" });
        await News.destroy({
            where: { id: news.id }
        });
        res.status(200).json({ msg: "News Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
