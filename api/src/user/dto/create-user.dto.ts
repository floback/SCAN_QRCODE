import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum, IsUUID } from 'class-validator';

 export enum  UserType  {
  owner = 'owner',
  admin = 'admin',
  user = 'user',
}
export class CreateUserDto {

@IsOptional()
@IsString()
@IsUUID()
id?: string;


  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;
  
  @IsEnum(UserType)
  @IsOptional()
  type_user?: UserType;


  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
