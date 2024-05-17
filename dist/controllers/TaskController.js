"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = exports.TaskController = void 0;
const services_1 = require("../services");
class TaskController {
    service = new services_1.TaskService();
    list = async (req, res) => {
        const categoryName = req.query.category
            ? String(req.query.category)
            : undefined;
        const userId = res.locals.decoded.id;
        const tasks = await this.service.list(categoryName, userId);
        return res.status(200).json(tasks);
    };
    retrieve = async (req, res) => {
        const taskId = Number(req.params.id);
        const task = await this.service.retrieve(taskId);
        return res.status(200).json(task);
    };
    create = async (req, res) => {
        const userId = res.locals.decoded.id;
        const task = await this.service.create(req.body, userId);
        return res.status(201).json(task);
    };
    update = async (req, res) => {
        const taskId = Number(req.params.id);
        const task = await this.service.update(taskId, req.body);
        return res.status(200).json(task);
    };
    delete = async (req, res) => {
        const task = await this.service.delete(Number(req.params.id));
        return res.status(204).json(task);
    };
}
exports.TaskController = TaskController;
exports.taskController = new TaskController();
