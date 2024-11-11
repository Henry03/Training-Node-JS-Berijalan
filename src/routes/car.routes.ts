import { Router } from "express";
import { CCreateCar, CGetAllCars, CGetCarById } from "../controllers/car.controller";
import express from "express";
import multer from "multer";

const router = Router();
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 10 * 2024 * 2024}
}).single('image');

router.get("/", CGetAllCars);
router.get("/:id", CGetCarById);
router.post("/", upload, CCreateCar);

export default router;