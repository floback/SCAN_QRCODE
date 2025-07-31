import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';


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
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;
  
  @IsEnum(UserType)
  @IsOptional()
  type_user?: UserType;


  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  readonly isActive: boolean;
  status?: boolean;
}
