"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const services_1 = require("../services");
class CategoryController {
    service = new services_1.CategoryService();
    create = async (req, res) => {
        const userId = res.locals.decoded.id;
        const category = await this.service.create(req.body, userId);
        return res.status(201).json(category);
    };
    delete = async (req, res) => {
        const category = await this.service.delete(Number(req.params.id));
        return res.status(204).json(category);
    };
}
exports.CategoryController = CategoryController;
