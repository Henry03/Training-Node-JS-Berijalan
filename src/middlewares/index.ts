import { NextFunction, RequestHandler } from "express";
import { formatResponse } from "../utils";
import env from "../config/env.config";
import { verifyToken } from "../utils/jwt";

const checkHeader:RequestHandler = (req, res, next) => {
    const contentType = req.headers['content-type'];
    const apiKey = req.headers['apikey'];

    if(contentType !== 'application/json') {
        res.status(400).json(
            formatResponse(400, "Invalid contentType")
        )
        return;
    }

    if(apiKey !== env.API_KEY){
        res.status(401).json(
            formatResponse(401, "Unauthorized")
        )
        return;
    }

    return next();
};

const loggingMiddlware: RequestHandler = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    return next();
}

const checkAuth: RequestHandler = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        res.status(401).json(formatResponse(401, "Unauthorized"));
        return;
    }

    const verify = verifyToken(token, env.ACCESS_TOKEN_SECRET);

    if(!verify) {
        if(verify == null){
            res.status(401).json(formatResponse(401, "Token expired"));
            return;
        }else{
            res.status(401).json(formatResponse(401, "Unauthorized"));
            return;
        }
    }

    return next();
}

const errorHandler = (err: any, req: any, res: any, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json(formatResponse(statusCode, message));
}

export {checkHeader, loggingMiddlware, checkAuth, errorHandler};