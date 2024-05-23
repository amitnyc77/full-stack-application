import { Request, Response } from 'express';
import Post from '../models/post';
import { AuthRequest } from '../middleware/auth';
import { sendMessage } from '../kafka/producer';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const post = new Post({ title, content, userId: userId.toString() });
    await post.save();

    await sendMessage('posts', JSON.stringify(post));

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  try {
    const posts = await Post.find({ userId: userId.toString() });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePost = async (req: AuthRequest, res: Response) => {
  const { id, title, content } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post || post.userId !== req.user.id.toString()) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.content = content;

    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post || post.userId !== req.user.id.toString()) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await Post.deleteOne({ _id: id });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
