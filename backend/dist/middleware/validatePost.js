"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = void 0;
const validatePost = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Title is required' });
    }
    if (!content || content.trim() === '') {
        return res.status(400).json({ message: 'Content is required' });
    }
    next();
};
exports.validatePost = validatePost;
