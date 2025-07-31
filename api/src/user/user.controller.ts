import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-update-user.dto'
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth-guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decoraters/ roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import  { extname }  from 'path';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log(createUserDto)
    return this.userService.create(createUserDto);
  }

  @Post('register')
  createUserUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log('Recebi a requisição:', createUserDto);
    return this.userService.createUserUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Get(':id')
  findById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Patch(':id')
@UseInterceptors(FileInterceptor('avatar', {
  storage: diskStorage({
    destination: './uploads/avatar',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Tipo de arquivo inválido!'), false);
    }
  },
}))
async updateUser(
  @Param('id') id: string,
  @Body() updateUserDto: UpdateUserDto,
  @UploadedFile() avatar?: Express.Multer.File,
) {
  return this.userService.updateUser(id, updateUserDto, avatar?.filename); // <-- importante passar filename
}



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER, Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
