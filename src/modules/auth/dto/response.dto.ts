export class UserResponseDto {
    readonly status: boolean;
    readonly data: UserRegisterDto;

    constructor(
        status: boolean,
        data: UserRegisterDto,
    ) {
        this.status = status;
        this.data = data;
    }

}

export class UserRegisterDto {
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly token?: string;

    constructor(
        id: string,
        username: string,
        email: string,
        token?: string,
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
    }
}

export class UserDto {
    readonly id: string;
    readonly username: string;
    readonly email: string;

    constructor(
        id: string,
        username: string,
        email: string,
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    static fromDatabaseModel(model): UserDto {
        const { id, username, email } = model;
        return new UserDto(id, username, email);
    }
}