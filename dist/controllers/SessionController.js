"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionController = exports.SessionController = void 0;
const services_1 = require("../services");
const httpStatusCode_1 = require("../utils/httpStatusCode");
class SessionController {
    service = new services_1.SessionService();
    login = async (req, res) => {
        const user = await this.service.login(req.body);
        return res.status(httpStatusCode_1.status.HTTP_200_OK).json(user);
    };
}
exports.SessionController = SessionController;
exports.sessionController = new SessionController();
