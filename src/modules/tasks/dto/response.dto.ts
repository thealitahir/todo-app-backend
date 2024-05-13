export class TaskResponseDto {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly completed: boolean;
    readonly userId: string

    constructor(
        id: string,
        title: string,
        description: string,
        completed: boolean,
        userId: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.userId = userId;
    }
}

export class TaskResponse {
    readonly status: boolean;
    readonly data: TaskResponseDto;

    constructor(
        status: boolean,
        data: TaskResponseDto
    ) {
        this.status = status;
        this.data = data;
    }
}

