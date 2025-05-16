import { UserEntity } from 'src/user/entities/user.entity';
export declare class QrcodeEntity {
    name: string;
    id: string;
    id_user: string;
    code: string;
    status: boolean;
    number_fone: string;
    link_add: string;
    img: string;
    user: UserEntity;
}
