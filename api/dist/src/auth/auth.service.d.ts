import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { AuthEntity } from './entities/auth.entities';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    private readonly authRepository;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService, authRepository: Repository<AuthEntity>);
    login(email: string, password: string): Promise<{
        access_token: string;
        expires_in: string;
        user: {
            id: string;
            email: string;
            name: string;
            type_user: import("../user/dto/create-user.dto").UserType;
        };
    }>;
}
