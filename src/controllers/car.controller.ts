import { Request, Response } from "express";
import { formatResponse } from "../utils";
import SCar from "../services/car.service";
import fs from 'fs';
import path from "path";

const CGetAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await SCar.findAll();

        res.json(formatResponse(200, "Success", cars));
    }catch(error: any) {
        res.status(500).json(formatResponse(500, error.message))
    }
}

const CGetCarById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const car = await SCar.findById(id);

        if(!car) {
            res.status(404).json(formatResponse(404, "Car not found"));
            return;
        }

        res.json(formatResponse(200, "Success", car));
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message));
    }
}

const CCreateCar = async (req: Request, res: Response) => {
    try {
        const image = req.file;
        const { name, model, variant, price, isNew, iklanId } = req.body;

        if (!image) {
            res.status(400).json(formatResponse(400, 'No valid image provided.'));
            return;
        }
        console.log(image)

        const fileExtension = path.extname(image.originalname);
        const fileName = name + '_' + model + '_' + variant + '_' + Date.now() + fileExtension;
        const savePath = path.join(process.cwd(), 'public', 'images', fileName);
        
        fs.mkdirSync(path.dirname(savePath), {recursive: true})

        fs.renameSync(image.path, savePath);

        const data = {
            name: name,
            model: model,
            variant: variant,
            price: parseFloat(price),
            isNew: isNew === 'true' ? true : false,
            iklanId: iklanId,
            image: fileName
        }
        const newCar = await SCar.create(data);

        res.json(formatResponse(200, "Success", newCar))
    } catch (error: any) {
        res.json(formatResponse(500, error.message));
    }
}

export {
    CGetAllCars,
    CGetCarById,
    CCreateCar
}