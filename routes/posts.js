import express  from "express";
import { likePost,getPosts,createPost,updatePost, deletePost } from "../controllers/posts.js";

const router = express.Router();


router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost',likePost)
export default router;