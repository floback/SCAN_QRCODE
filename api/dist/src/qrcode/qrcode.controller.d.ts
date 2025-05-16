import { QrcodeService } from './qrcode.service';
import { QrcodeEntity } from './entities/qrcode.entity';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
export declare class QrcodeController {
    private readonly qrcodeService;
    constructor(qrcodeService: QrcodeService);
    createQRCode(req: any, createQrcodeDto: CreateQrcodeDto): Promise<QrcodeEntity>;
    findAll(): Promise<QrcodeEntity[]>;
    findById(id: string): Promise<QrcodeEntity>;
    delete(id: string): Promise<string>;
    openWhatsapp(id: string): Promise<string>;
    update(id: string, createQrcodeDto: CreateQrcodeDto): Promise<QrcodeEntity>;
}
