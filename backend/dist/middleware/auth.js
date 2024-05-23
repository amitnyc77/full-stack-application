"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
};
exports.authenticateJWT = authenticateJWT;
