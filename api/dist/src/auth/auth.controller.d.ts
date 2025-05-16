import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
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
