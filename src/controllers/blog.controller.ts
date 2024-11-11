import { Request, Response } from 'express';
import SBlog from '../services/blog.service';
import { formatResponse } from '../utils';

const CGetAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await SBlog.findAll();

        res.json(formatResponse(200, "Success", blogs));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message));
    }
}

const CGetBlogById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const blog = await SBlog.findById(id);

        if(!blog) {
            res.status(404).json(formatResponse(404, "Blog not found"));
            return;
        }

        res.json(formatResponse(200, "Success", blog));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message));
    }
}

export {
    CGetAllBlogs,
    CGetBlogById
}