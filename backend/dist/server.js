"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = require("./config/mysql");
const mongo_1 = require("./config/mongo");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_1.connectMySQL)();
    yield (0, mongo_1.connectMongoDB)();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
startServer();
