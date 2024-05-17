"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const routers_1 = require("./routers");
const middlewares_1 = require("./middlewares");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/tasks", routers_1.taskRouter);
exports.app.use("/categories", routers_1.categoryRouter);
exports.app.use("/users", routers_1.userRouter);
exports.app.use(middlewares_1.handleErrors);
