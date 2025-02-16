import { Injectable } from "@nestjs/common";
import { CreateUserDto, DetailUserDto, UpdateUserDto } from "src/dto/User.dto";
import prismaClient from "src/prisma";
import { hash } from "bcryptjs";

@Injectable() 
export class UserService {
    async createUser({ email, name, password }: CreateUserDto) {
        if(!email || !password || !name) {
            throw new Error("Email/Password incorrect.");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error("User/Email already exists.");
        }

        const passwordHash = await hash(password, 8);
        const user = await prismaClient.user.create({
            data: {
                email: email,
                name: name,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }

    async updateUser({ id, name, email }: UpdateUserDto) {
        if(!name || !email) {
            throw new Error("Email/Name must be value.");
        }

        const user = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                name: name,
                email: email
            }
        });

        return user;
    }

    async detailUser({ id }: DetailUserDto) {
        if(!id) {
            throw new Error("user not exists.");
        }

        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                refreshTokens: true
            }
        });

        return user;
    }
}

