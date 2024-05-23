"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const userId = req.user.id;
    try {
        const post = new post_1.default({ title, content, userId: userId.toString() });
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const posts = yield post_1.default.find({ userId: userId.toString() });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getPosts = getPosts;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, content } = req.body;
    console.log(`Updating post with id: ${id}`); // Log the ID
    try {
        const post = yield post_1.default.findById(id);
        console.log(`Post found: ${post}`); // Log the found post
        if (!post || post.userId !== req.user.id.toString()) {
            console.log(`Post not found or user unauthorized: Post ID - ${id}, User ID - ${req.user.id}`);
            return res.status(404).json({ message: 'Post not found' });
        }
        post.title = title;
        post.content = content;
        yield post.save();
        res.json(post);
    }
    catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Deleting post with id: ${id}`); // Log the ID
    try {
        const post = yield post_1.default.findById(id);
        console.log(`Post found: ${post}`); // Log the found post
        if (!post || post.userId !== req.user.id.toString()) {
            console.log(`Post not found or user unauthorized: Post ID - ${id}, User ID - ${req.user.id}`);
            return res.status(404).json({ message: 'Post not found' });
        }
        yield post_1.default.deleteOne({ _id: id });
        res.json({ message: 'Post deleted' });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deletePost = deletePost;
