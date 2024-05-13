import { Controller, Get, Post, Body, Res, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/request.dto';
import { AUTH_ENDPOINTS } from './endpoints/endpoints';
import { PostgreStatusCode } from 'src/common/enums/enums';
import { JwtAuthGuard } from 'src/common/guards/auth-guard';
import { ApiResponseTags } from 'src/common/helper/decorators/api-response-tags.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiResponseTags()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(AUTH_ENDPOINTS.SIGN_UP)
  async create(@Res() response: Response, @Body() createAuthDto: RegisterDto) {
    try {
      const data = await this.authService.create(createAuthDto);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Post(AUTH_ENDPOINTS.SIGN_IN)
  async login(@Res() response: Response, @Body() loginDto: LoginDto) {
    try {
      const data = await this.authService.login(loginDto);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(AUTH_ENDPOINTS.MY_PROFILE)
  @UseGuards(JwtAuthGuard)
  async myProfile(@Req() req, @Res() response: Response) {
    try {
      const data = await this.authService.myProfile(req?.user?.id);
      response.status(PostgreStatusCode.SUCCESS_CODE).send(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
