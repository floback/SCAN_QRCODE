import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly jwtService;
    private readonly usersRepository;
    private readonly mailerService;
    constructor(jwtService: JwtService, usersRepository: Repository<UserEntity>, mailerService: MailerService);
    sendRecoveryEmail(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
