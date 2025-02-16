export class CreateUserDto {
    email: string;
    name:  string;
    password: string;
}

export class UpdateUserDto {
    id: string;
    name: string;
    email: string;
}

export class DetailUserDto {
    id: string;
}