import {Request, Response} from "express";
import { formatResponse } from "../utils";
import SAuth from "../services/auth.service";

const CLogin = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if(!username || !password) {
        res.status(400).json(
            formatResponse(400, "Username or password is required")
        )
        return;
    }

    try {
        const { accessToken, refreshToken } = await SAuth.login(username, password);

        res.json(formatResponse(200, "Success", {accessToken, refreshToken}))
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message))
    }
};

const CRegister = async (req: Request, res: Response) => {
    const {username, password} = req.body;

    if(!username || !password) {
        res.status(400).json(
            formatResponse(400, "Username or password is required")
        )
        return;
    }

    try {
        const newUser = await SAuth.register(username, password);

        res.json(formatResponse(200, "Success", newUser))
    } catch (error: any) {
        res.status(500).json(formatResponse(500, error.message))
    }
}

const CRefreshToken = async (req: Request, res: Response) => {
    const {refreshToken} = req.body;

    if(!refreshToken) {
        res.status(400).json(
            formatResponse(400, "Refresh token is required")
        )
        return;
    }

    try {
        const accessToken = await SAuth.refreshToken(refreshToken);

        res.json(formatResponse(200, "Success", accessToken))
    } catch ( error: any) {
        res.status(500).json(formatResponse(500, error.message))
    }
}

export {CLogin, CRegister, CRefreshToken};