import { Router } from "express";
import { CMathDeleteHistory, CMathHistory, CMathOperation, CMathOperationList } from "../controllers/math.controller";

const router = Router();

router.get("/list", CMathOperationList);
router.get("/", CMathOperation);
router.get("/:valueA/:operation/:valueB", CMathOperation);
router.post("/", CMathOperation);
router.get("/history", CMathHistory);
router.delete("/history/:id", CMathDeleteHistory);

export default router;