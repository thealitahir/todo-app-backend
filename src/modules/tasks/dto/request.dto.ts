import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TaskDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'This is a required property',
    })
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'This is a optional property',
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        type: Boolean,
        required: false,
        description: 'This is a optional property',
    })
    @IsBoolean()
    @IsOptional()
    completed: string;
}