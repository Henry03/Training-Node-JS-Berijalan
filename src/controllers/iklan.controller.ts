import { Request, Response } from 'express';
import { formatResponse } from '../utils';
import SIklan from '../services/iklan.service';

const CGetAllIklans = async(req: Request, res: Response) => {
    try {
        const iklans = await SIklan.findAll();

        res.json(formatResponse(200, "Success", iklans));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message))
    }
}

const CGetIklanById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const iklan = await SIklan.findById(id);

        if(!iklan) {
            res.status(404).json(formatResponse(404, "Iklan not found"));
            return;
        }

        res.json(formatResponse(200, "Success", iklan));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message))
    }
}

export { 
    CGetAllIklans,
    CGetIklanById
}