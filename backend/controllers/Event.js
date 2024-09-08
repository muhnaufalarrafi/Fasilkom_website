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
        const eventUuid = req.params.id; // Pastikan ini diambil dengan benar
        const event = await Event.findOne({
            where: { uuid: eventUuid },
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }]
        });
        if (!event) return res.status(404).json({ msg: "Event not found" });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createEvent = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.body.userUuid  // Mengambil UUID user dari request body
            }
        });

        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            image: req.body.image,
            userId: user.id  // Menggunakan ID user yang valid
        });
        res.status(201).json(event);
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
