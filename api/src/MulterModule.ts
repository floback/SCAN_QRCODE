import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 5 * 1024 * 1024 }, // até 5MB
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
