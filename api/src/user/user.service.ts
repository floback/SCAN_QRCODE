import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExisting = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExisting) {
      throw new ConflictException(`E-mail ${createUserDto.email} already exists`);
    }

    const hashePassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashePassword,
    });
    return await this.userRepository.save(user);
  }

  async createUserUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExisting = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExisting) {
      throw new ConflictException(`E-mail ${createUserDto.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      status: true,
      type_user: UserType.user,
    });

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    return user;
  }

 async updateUser(
  id: string,
  updateUserDto: UpdateUserDto,
  avatarFilename?: string,
): Promise<UserEntity> {
  const user = await this.findById(id);

  if (avatarFilename) {
    updateUserDto.avatar = `uploads/avatar/${avatarFilename}`;
  }


if (updateUserDto.status !== undefined) {
  const status = String(updateUserDto.status).toLowerCase();
  updateUserDto.status = status === 'true';
}


  const updated = Object.assign(user, updateUserDto);
  console.log(id, updated)
  return await this.userRepository.save(updated);
}


  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
    return { message: `User id ${user.id} removed!` };
  }
}
