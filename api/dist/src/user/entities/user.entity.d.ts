import { UserType } from '../dto/create-user.dto';
import { QrcodeEntity } from 'src/qrcode/entities/qrcode.entity';
import { AuthEntity } from 'src/auth/entities/auth.entities';
export declare class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    type_user: UserType;
    status: boolean;
    qrcodes: QrcodeEntity[];
    auth: AuthEntity[];
}
