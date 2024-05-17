"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = require("../errors/AppError");
const jsonwebtoken_1 = require("jsonwebtoken");
const configs_1 = require("../configs");
const httpStatusCode_1 = require("../utils/httpStatusCode");
class AuthMiddleware {
    isAuthenticated = (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AppError_1.AppError("Token is required", httpStatusCode_1.status.HTTP_401_UNAUTHORIZED);
        }
        const [_, token] = authorization.split(" ");
        const { secret } = (0, configs_1.jwtConfig)();
        const jwtPayload = (0, jsonwebtoken_1.verify)(token, secret);
        console.log(jwtPayload);
        res.locals = {
            ...res.locals,
            decoded: jwtPayload,
        };
        return next();
    };
}
;
exports.auth = new AuthMiddleware();
