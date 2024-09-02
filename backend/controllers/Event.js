import { validationResult } from "express-validator";
import Event from "../models/EventModel.js";
import Users from "../models/UserModel.js";

export const getEvents = async (req, res) => {
    try {
        const response = await Event.findAll({
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

export const getEventById = async (req, res) => {
    try {
        const response = await Event.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }]
        });
        if (!response) return res.status(404).json({ msg: "Event not found" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, date, time, location, image } = req.body;
    try {
        await Event.create({
            title: title,
            description: description,
            date: date,
            time: time,
            location: location,
            image: image,
            userId: req.userId
        });
        res.status(201).json({ msg: "Event Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const event = await Event.findOne({
            where: { uuid: req.params.id }
        });
        if (!event) return res.status(404).json({ msg: "Event not found" });
        const { title, description, date, time, location, image } = req.body;
        await Event.update({
            title: title,
            description: description,
            date: date,
            time: time,
            location: location,
            image: image
        }, {
            where: { id: event.id }
        });
        res.status(200).json({ msg: "Event Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            where: { uuid: req.params.id }
        });
        if (!event) return res.status(404).json({ msg: "Event not found" });
        await Event.destroy({
            where: { id: event.id }
        });
        res.status(200).json({ msg: "Event Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
