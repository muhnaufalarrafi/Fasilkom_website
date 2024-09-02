import Discussion from "../models/DiscussionModel.js";
import Comment from "../models/CommentModel.js";
import Users from "../models/UserModel.js";

export const getDiscussions = async (req, res) => {
    try {
        const response = await Discussion.findAll({
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

export const getDiscussionById = async (req, res) => {
    try {
        const response = await Discussion.findOne({
            where: { uuid: req.params.id },
            include: [{
                model: Users,
                attributes: ['name', 'email']
            }, {
                model: Comment,
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            }]
        });
        if (!response) return res.status(404).json({ msg: "Discussion not found" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createDiscussion = async (req, res) => {
    const { title, content } = req.body;
    try {
        await Discussion.create({
            title: title,
            content: content,
            userId: req.userId
        });
        res.status(201).json({ msg: "Discussion Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findOne({
            where: { uuid: req.params.id }
        });
        if (!discussion) return res.status(404).json({ msg: "Discussion not found" });
        const { title, content } = req.body;
        await Discussion.update({
            title: title,
            content: content
        }, {
            where: { id: discussion.id }
        });
        res.status(200).json({ msg: "Discussion Updated Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findOne({
            where: { uuid: req.params.id }
        });
        if (!discussion) return res.status(404).json({ msg: "Discussion not found" });
        await Discussion.destroy({
            where: { id: discussion.id }
        });
        res.status(200).json({ msg: "Discussion Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const addComment = async (req, res) => {
    const { content, image } = req.body;
    try {
        const discussion = await Discussion.findOne({
            where: { uuid: req.params.discussionId }
        });
        if (!discussion) return res.status(404).json({ msg: "Discussion not found" });
        await Comment.create({
            content: content,
            image: image,
            discussionId: discussion.id,
            userId: req.userId
        });
        res.status(201).json({ msg: "Comment Added Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: { uuid: req.params.commentId }
        });
        if (!comment) return res.status(404).json({ msg: "Comment not found" });
        await Comment.destroy({
            where: { id: comment.id }
        });
        res.status(200).json({ msg: "Comment Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
