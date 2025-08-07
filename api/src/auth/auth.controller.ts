import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(`Usuário logado ${loginDto.email}, ${loginDto.password}`)
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
