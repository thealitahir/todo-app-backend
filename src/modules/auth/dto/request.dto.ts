import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class LoginDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
