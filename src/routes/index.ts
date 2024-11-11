import { Router, Response, Request } from 'express';
import promoRouter from './promo.routes';
import articleRouter from './article.routes';
import tagRouter from './tag.routes';
import bookRouter from './book.routes';
import carRouter from './car.routes';
import iklanRouter from './iklan.routes';
import blogRouter from './blog.routes';

const router = Router();

router.get("/try", (req: Request, res: Response) => {
    res.send("Hello World!");
});

router.get("/about", (req: Request, res: Response) => {
   const url = req.url;
   res.json({
    message: `We in ${url}`,
   }) 
});

router .get("/user/:person", (req: Request, res: Response) => {
    const { person } = req.params;
    res.send(`Hello ${person}`);
})

router.get("/user/:id/posts", (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({
        message: `Get user id ${id} posts`,
    })
})

router.use("/book", bookRouter)
router.use("/promo", promoRouter);
router.use("/article", articleRouter);
router.use("/tag", tagRouter);

// Tugas Prisma
router.use("/car", carRouter);
router.use("/iklan", iklanRouter);
router.use("/blog", blogRouter);

export default router;