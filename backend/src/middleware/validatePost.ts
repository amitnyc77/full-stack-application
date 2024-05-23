import { Request, Response, NextFunction } from 'express';

export const validatePost = (req: Request, res: Response, next: NextFunction) => {
  const { title, content } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'Content is required' });
  }

  next();
};
