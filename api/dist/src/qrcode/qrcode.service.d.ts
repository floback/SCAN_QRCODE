import { Repository } from 'typeorm';
import { QrcodeEntity } from './entities/qrcode.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
export declare class QrcodeService {
    private readonly qrcodeRepository;
    private readonly userRepository;
    constructor(qrcodeRepository: Repository<QrcodeEntity>, userRepository: Repository<UserEntity>);
    createQRCode(id_user: string, number_fone: string, link_add: string, name?: string): Promise<QrcodeEntity>;
    findById(id: string): Promise<QrcodeEntity | null>;
    findAll(): Promise<QrcodeEntity[]>;
    delete(id: string): Promise<string>;
    openWhatsapp(number_fone: string): string;
    activateQRCode(id: string): Promise<QrcodeEntity>;
    deactivateQRCode(id: string): Promise<QrcodeEntity>;
    update(id: string, createQrcodeDto: CreateQrcodeDto): Promise<QrcodeEntity>;
}
