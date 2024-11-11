import { Request, Response } from "express"
import { Router } from "express";
import { formatResponse } from "../utils";
import { checkAuth, checkHeader, loggingMiddlware } from "../middlewares";

const router = Router();



// Todo : 

const books = [
    { id: "1", title: "1984", author: "George Orwell" },
    { id: "2", title: "Brave New World", author: "Aldous Huxley" },
];

// Spesific Middleware
router.get("/books", checkHeader, loggingMiddlware, checkAuth, (req: Request, res: Response) => {
    res.json({
        status: 200,
        message: "Success",
        data: books
    });
})

router.post("/books", (req: Request, res: Response) => {
    const { title, author} = req.body;

    if(!title || !author) {
        res.status(400).json({
            status: 400,
            message: "Title or Author is required",
            data: null
        })
    }

    const newBook = {
        id: (books.length + 1).toString(),
        title,
        author
    }

    books.push(newBook);

    res.status(201).json({
        status: 201,
        message: "Book added successfully",
        data: newBook
    })
})

router.get("/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    
    const book = books.find((book) => book.id === id);

    if(!book) {
        res.status(404).json(
            formatResponse(404, "Book not found")
        )
    }

    res.status(200).json(formatResponse(200, "success", book))
})

router.put("/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    const book = books.find((book) => book.id === id);

    if(!book) {
        res.status(404).json(
            formatResponse(404, "Book not found")
        )
    }else{
        const { title, author } = req.body;
        
        if(!title || !author) {
            res.status(400).json(
                formatResponse(400, "Title or Author is required")
            )
            return;
        }
    
        book.title = title;
        book.author = author;
    
        res.status(200).json(formatResponse(200, "success", book))

    }
})

router.delete("/books/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === id);

    if(bookIndex === -1) {
        res.status(404).json(
            formatResponse(404, "Book not found")
        )
    }else{
        books.splice(bookIndex, 1);
    }
})

router.get("/book/search", (req: Request, res: Response) => {
    const {author} = req.query;

    const filteredBooks = books.filter((book) => book.author.includes(author as string));

    if(filteredBooks.length > 0){
        res.status(200).json(formatResponse(200, "success", filteredBooks))
    }else{
        res.status(404).json(
            formatResponse(404, "Book not found")
        )
    }
})


export default router;