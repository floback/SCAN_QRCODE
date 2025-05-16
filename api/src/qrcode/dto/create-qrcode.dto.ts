import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateQrcodeDto {

  @IsOptional()
  @IsString()
  name?: string;
  
  @IsString()
  link_add: string;

  @IsNumber()
  number_fone: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  @IsString()
  code?: string;
}
