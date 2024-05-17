"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
exports.categoryRouter = (0, express_1.Router)();
const categoryController = new controllers_1.CategoryController();
exports.categoryRouter.post("", middlewares_1.auth.isAuthenticated, middlewares_1.ensure.bodyIsValid(schemas_1.categoryCreateSchema), categoryController.create);
// categoryRouter.use("/:id", ensureCategory.idValid);
exports.categoryRouter.delete("/:id", middlewares_1.ensureCategory.idValid, middlewares_1.auth.isAuthenticated, middlewares_1.ensureCategory.isCategOwner, categoryController.delete);
