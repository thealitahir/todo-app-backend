import { Injectable } from '@nestjs/common';

import { LoginDto, RegisterDto } from './dto/request.dto';
import { UserDto, UserResponseDto } from './dto/response.dto';
import { BaseService } from 'src/common/services/base-service';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword, encryptPassword, generateToken } from './helper-functions';

@Injectable()
export class AuthService {
  private usersRep;

  constructor(
    private prismaService: PrismaService, // Inject the PrismaService
  ) {
    this.usersRep = new BaseService(
      this.prismaService,
      'users',
    );
  }

  /**
  * Returns the { status: boolean, data: user }.
  *
  * @remarks
  * This method is used to create user.
  *
  * @param username - The first input username
  * @param email - The first input email
  * @param password - The first input password
  * @returns { status: boolean, data: user }
  *
  * @beta
  */
  async create(payload: RegisterDto): Promise<UserResponseDto> {
    const userExist = await this.usersRep.findOne({
      where: { email: payload.email },
    });

    payload.password = await encryptPassword(payload.password)

    if (userExist) {
      throw 'User with this email already exists.';
    }

    const data = await this.usersRep.save(payload);

    const userDto = UserDto.fromDatabaseModel(data);

    const token = await generateToken({ ...userDto });

    return new UserResponseDto(true, {
      ...userDto,
      token
    })
  }

  /**
  * Returns the { status: boolean, data: user }.
  *
  * @remarks
  * This method is used to login user.
  *
  * @param email - The first input email
  * @param password - The first input password
  * @returns { status: boolean, data: user }
  *
  * @beta
  */
  async login(payload: LoginDto): Promise<UserResponseDto> {
    const userExist = await this.usersRep.findOne({
      where: { email: payload.email },
    });

    if (!userExist) {
      throw 'Invalid email or password!'
    }

    const authenticated = await comparePassword(payload.password, userExist.password);
    if (!authenticated) {
      throw 'Invalid email or password!'
    }

    const userDto = UserDto.fromDatabaseModel(userExist);
    const token = generateToken({ ...userDto })
    return new UserResponseDto(true, {
      ...userDto,
      token
    })
  }

  /**
  * Returns the { status: boolean, data: user }.
  *
  * @remarks
  * This method is used to get user details.
  *
  * @returns { status: boolean, data: user }
  *
  * @beta
  */
  async myProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.usersRep.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw 'User not found!'
    }

    const userDto = UserDto.fromDatabaseModel(user);
    return new UserResponseDto(true, {
      ...userDto,
    })
  }
}
