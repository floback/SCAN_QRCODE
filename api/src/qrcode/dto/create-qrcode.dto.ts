import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer'; // Separado para clareza


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
  @IsString()
  @Transform(({ value }) => value.toString())
  number_fone?: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  @IsString()
  code?: string;
}


