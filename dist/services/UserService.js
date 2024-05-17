"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = require("../database/prisma");
const schemas_1 = require("../schemas");
const bcryptjs_1 = require("bcryptjs");
const tsyringe_1 = require("tsyringe");
const httpStatusCode_1 = require("../utils/httpStatusCode");
const AppError_1 = require("../errors/AppError");
let UserService = class UserService {
    user = prisma_1.prisma.user;
    isUsernameUnique = async (name) => {
        const foundUser = await this.user.findFirst({ where: { name } });
        return Boolean(foundUser);
    };
    isUserEmailUnique = async (email) => {
        const foundUser = await this.user.findFirst({ where: { email } });
        return Boolean(foundUser);
    };
    list = async () => {
        const users = await this.user.findMany();
        return schemas_1.userReturnSchema.array().parse(users);
    };
    retrieve = async (id) => {
        const user = await this.user.findFirst({
            where: { id: id },
        });
        return schemas_1.userReturnSchema.parse(user);
    };
    create = async (payload) => {
        const founduser = await this.isUsernameUnique(payload.name);
        // if (founduser) {
        //   throw new AppError("Username already exists.", status.HTTP_409_CONFLICT);
        // }
        const foundemail = await this.isUserEmailUnique(payload.email);
        if (foundemail) {
            throw new AppError_1.AppError("This email is already registered.", httpStatusCode_1.status.HTTP_409_CONFLICT);
        }
        payload.password = await (0, bcryptjs_1.hash)(payload.password, 10);
        const newuser = await this.user.create({ data: payload });
        return schemas_1.userReturnSchema.parse(newuser);
    };
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)()
], UserService);
