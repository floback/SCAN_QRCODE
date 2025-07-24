import { All, BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-update-user.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Email } from '../email/entities/email.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  // CREATE USER
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

  // CREATE USER FROM PUBLIC FORM
  async createUserUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExisting = await this.userRepository.findOne({
      where: { email: createUserDto.email},
    });

    if (userExisting) {
      throw new ConflictException(`E-mail ${createUserDto.email} already exists`);
    }

    console.log(createUserDto)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      status: true, 
      type_user: UserType.user, 
    });

    return await this.userRepository.save(user);
  }



  // FIND ALL
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // FIND BY ID
  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    return user;
  }

  //UPDATE USER
  async updateUser(
  id: string,
  updateUserDto: UpdateUserDto,
): Promise<UserEntity> {
  if (!updateUserDto) {
    throw new BadRequestException('Corpo da requisição vazio');
  }

  const user = await this.findById(id);

  if (typeof updateUserDto.password === 'string' && updateUserDto.password.trim() !== '') {
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
  }

  if (updateUserDto.email && updateUserDto.email !== user.email) {
    const existing = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });
    if (existing) {
      throw new ConflictException(`This e-mail ${updateUserDto.email} is already in use`);
    }
  }

  const updated = Object.assign(user, updateUserDto);
  return await this.userRepository.save(updated);
}

  //DELETE USER
  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
    return { message: `User id ${user.id} removed!` };
  }
}


