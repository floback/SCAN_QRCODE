import { IsString, IsOptional, IsBoolean, IsIn, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { AppType } from './app-type.enum';

export class CreateQrcodeDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  link_add?: string;

  @IsOptional()
  @IsEnum(AppType, {
    message: 'app_type precisa ser whatsapp, telegram ou signal',
  })
  app_type?: AppType;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toString())
  number_fone?: string;
  
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsString()
  code?: string;
}
