import { Module } from "@nestjs/common";
import { UserController } from "src/controller/UserController";
import { UserService } from "src/services/UserService";

@Module({
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}