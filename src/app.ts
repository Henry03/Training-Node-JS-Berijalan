import express from 'express';
import router from "./routes";
import mathRouter from "./routes/math.routes";
import authRouter from "./routes/auth.routes";
import { checkHeader, errorHandler } from './middlewares';

const app = express();
const port = 3000;

app.use(express.json());

// Global middleware
// app.use(checkHeader);

// Akses static file di folder public
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.raw({ type: 'image/*', limit: '10mb' }));

app.use("/math", mathRouter)
app.use("/", router);
app.use("/auth", authRouter);

app.use(errorHandler);
// app.get('/user/:id', (req: Request, res: Response) => {
//     // const id = req.params.id;
//     const { id } = req.params;

//     res.send(`User ID: ${id}`);
// })

app.listen(port, () => {
    console.log(`[Server] : Server is running at http://localhost:${port}`);
});
