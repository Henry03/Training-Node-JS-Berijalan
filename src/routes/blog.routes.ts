import { Router } from "express";
import { CGetAllBlogs, CGetBlogById } from "../controllers/blog.controller";

const router = Router();

router.get('/', CGetAllBlogs);
router.get('/:id', CGetBlogById);

export default router;