"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const prisma_1 = require("../database/prisma");
const schemas_1 = require("../schemas");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
const configs_1 = require("../configs");
const httpStatusCode_1 = require("../utils/httpStatusCode");
class SessionService {
    user = prisma_1.prisma.user;
    login = async ({ email, password, }) => {
        const foundUser = await this.user.findFirst({
            where: { email: email },
        });
        if (!foundUser) {
            throw new AppError_1.AppError("User not exists", httpStatusCode_1.status.HTTP_404_NOT_FOUND);
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, foundUser.password);
        if (!passwordMatch) {
            throw new AppError_1.AppError("Email and password doesn't match ", httpStatusCode_1.status.HTTP_401_UNAUTHORIZED);
        }
        const { secret, expiresIn } = (0, configs_1.jwtConfig)();
        const token = (0, jsonwebtoken_1.sign)({
            id: foundUser.id,
        }, secret, {
            expiresIn: expiresIn,
        });
        return schemas_1.sessionReturnSchema.parse({ accessToken: token, user: foundUser });
    };
}
exports.SessionService = SessionService;
