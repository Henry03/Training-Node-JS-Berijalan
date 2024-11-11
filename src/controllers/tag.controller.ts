import { Request, Response } from 'express'
import { formatResponse } from '../utils';
import STag from '../services/tag.service';

const CGetAllTags = async (req: Request, res: Response) => {
    try{
        const tags = await STag.findAll();
        res.json(formatResponse(200, "Success", tags));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message));
    }
}

const CGetTagById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const Tag = await STag.findById(id);

        if(!Tag){
            res.status(404).json(formatResponse(404, "Tag not found"));
            return;
        }

        res.json(formatResponse(200, "Success", Tag));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message));
    }
}

const CCreateTag = async (req: Request, res: Response) => {
    try {
        const newTag = await STag.create(req.body);
        res.json(formatResponse(200, "Success", newTag));
    } catch(error: any) {
        res.status(500).json(formatResponse(500, error.message));
    }
}

const CUpdateTag = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedTag = await STag.update(id, req.body);

        if(!updatedTag){
            res.status(404).json(formatResponse(404, "Tag not found"));
            return;
        }

        res.json(formatResponse(200, "Success", updatedTag));
    }catch(error: any){
        res.status(500).json(formatResponse(500, error.message));
    }
}

const CDeleteTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTag = await STag.remove(id);
        
        if(!deletedTag){
            res.status(404).json(formatResponse(404, "Tag not found"));
            return;
        }

        res.json(formatResponse(200, "Success", deletedTag));
    } catch (error: any){
        res.status(500).json(formatResponse(500, error.message))
    }
}

export {
    CGetAllTags,
    CGetTagById,
    CCreateTag,
    CUpdateTag,
    CDeleteTag
}