import jwt from 'jsonwebtoken';
import { USER_SECRET } from "./config";

export const readToken = (req, res, next) => {
    const { token } = req.session;
    if(token) {
        const { username } = jwt.verify(token, USER_SECRET)
        req.username = username;
    }
    next();
}