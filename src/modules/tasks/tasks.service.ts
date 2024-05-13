import { Injectable } from '@nestjs/common';

import { TaskDto } from './dto/request.dto';
import { BaseService } from 'src/common/services/base-service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskResponse } from './dto/response.dto';

@Injectable()
export class TasksService {
  private tasksRep;

  constructor(
    private prismaService: PrismaService, // Inject the PrismaService
  ) {
    this.tasksRep = new BaseService(
      this.prismaService,
      'tasks',
    );
  }

  /**
  * Returns the { status: boolean, data: task }.
  *
  * @remarks
  * This method is used to create task.
  *
  * @param title - The first input title
  * @param description - The first input description
  * @returns { status: boolean, data: task }
  *
  * @beta
  */
  async create(createTaskDto: TaskDto, userId: string): Promise<TaskResponse> {
    const payload = {
      ...createTaskDto,
      userId
    }

    const data = await this.tasksRep.save(payload);
    return new TaskResponse(true, data)
  }

  /**
* Returns the { status: boolean, data: task }.
*
* @remarks
* This method is used to get tasks list.
*
* @returns { status: boolean, data: task }
*
* @beta
*/
  async findAll(userId: string) {
    const data = await this.tasksRep.findAll({
      where: {
        userId
      }
    })

    return {
      status: true,
      data
    }
  }

  /**
  * Returns the { status: boolean, data: task }.
  *
  * @remarks
  * This method is used to get task.
  *
  * @returns { status: boolean, data: task }
  *
  * @beta
  */
  async findOne(id: string, userId: string): Promise<TaskResponse> {
    const data = await this.tasksRep.findOne({
      where: {
        userId,
        id
      }
    })

    if (!data) {
      throw 'Task not found!'
    }

    return new TaskResponse(true, data)
  }

  /**
* Returns the { status: boolean, data: task }.
*
* @remarks
* This method is used to update task.
*
* @param title - The first input title
* @param description - The first input description
* @returns { status: boolean, data: task }
*
* @beta
*/
  async update(id: string, updateTaskDto: TaskDto, userId: string): Promise<TaskResponse> {
    const found = await this.findOne(id, userId)

    if (!found.data) {
      throw 'Task not found'
    }

    const data = await this.tasksRep.update(id, updateTaskDto)
    return new TaskResponse(true, data)
  }

  /**
* Returns the { status: boolean, data: task }.
*
* @remarks
* This method is used to delete task.
*
* @returns { status: boolean, data: task }
*
* @beta
*/
  async remove(id: string, userId: string): Promise<TaskResponse> {
    const found = await this.findOne(id, userId)

    if (!found.data) {
      throw 'Task not found'
    }

    await this.tasksRep.delete(id)
    return new TaskResponse(true, found.data)

  }
}
