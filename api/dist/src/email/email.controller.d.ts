import { EmailService } from './email.service';
import { ResetPasswordDto } from './dto/create-email.dto';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendRecoveryEmail(email: string): Promise<string>;
    resetPassword(body: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
