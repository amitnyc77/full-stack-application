import express from 'express';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController';
import { authenticateJWT } from '../middleware/auth';
import { validatePost } from '../middleware/validatePost';

const router = express.Router();

router.post('/', authenticateJWT, validatePost, createPost); 
router.get('/', authenticateJWT, getPosts);
router.put('/', authenticateJWT, validatePost, updatePost);
router.delete('/:id', authenticateJWT, deletePost);

export default router;
