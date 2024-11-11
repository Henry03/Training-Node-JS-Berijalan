import { Router } from "express";
import { CGetAllIklans, CGetIklanById } from "../controllers/iklan.controller";

const router = Router();

router.get('/', CGetAllIklans);
router.get('/:id', CGetIklanById);

export default router;