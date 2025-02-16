import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDto, DetailUserDto, UpdateUserDto } from "src/dto/User.dto";
import { UserService } from "src/services/UserService";

@Controller("user")
export class UserController {
    constructor(private readonly service: UserService) {}

    @Get()
    async DetailUser(@Param('id') id: DetailUserDto) {
        return await this.service.detailUser(id);
    }

    @Post()
    async CreateUser(@Body() data: CreateUserDto) {
        return await this.service.createUser(data);
    }

    @Put()
    async UpdateUser(@Body() data: UpdateUserDto) {
        return await this.service.updateUser(data);
    }
}