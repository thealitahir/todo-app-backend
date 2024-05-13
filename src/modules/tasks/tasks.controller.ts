import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';

import { Response } from 'express'

import { TasksService } from './tasks.service';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { TASK_ENDPOINTS } from './endpoints/endpoints';
import { TaskDto } from './dto/request.dto';
import { JwtAuthGuard } from 'src/common/guards/auth-guard';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiResponseTags()
@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post(TASK_ENDPOINTS.CREATE_TASK)
  async create(@Req() req, @Res() response: Response, @Body() taskDto: TaskDto) {
    try {
      const data = await this.tasksService.create(taskDto, req.user?.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(TASK_ENDPOINTS.GET_TASKS)
  async findAll(@Req() req, @Res() response: Response) {
    try {
      const data = await this.tasksService.findAll(req.user?.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  async findOne(@Req() req, @Res() response: Response, @Param('id') id: string) {
    try {
      const data = await this.tasksService.findOne(id, req.user?.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Patch(':id')
  async update(@Req() req, @Res() response: Response, @Param('id') id: string, @Body() updateTaskDto: TaskDto) {
    try {
      const data = await this.tasksService.update(id, updateTaskDto, req.user?.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async remove(@Req() req, @Res() response: Response, @Param('id') id: string) {
    try {
      const data = await this.tasksService.remove(id, req.user?.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
