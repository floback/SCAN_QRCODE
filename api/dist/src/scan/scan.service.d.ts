import { Repository } from 'typeorm';
import { ScanEntity } from './entities/scan.entity';
import { QrcodeEntity } from 'src/qrcode/entities/qrcode.entity';
export declare class ScanService {
    private readonly scanRepository;
    private readonly qrcodeRepository;
    constructor(scanRepository: Repository<ScanEntity>, qrcodeRepository: Repository<QrcodeEntity>);
    create(data: Partial<ScanEntity>): Promise<ScanEntity>;
    findByCode(code: string): Promise<QrcodeEntity | null>;
    findAll(): Promise<ScanEntity[]>;
    findById(id: string): Promise<ScanEntity>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
