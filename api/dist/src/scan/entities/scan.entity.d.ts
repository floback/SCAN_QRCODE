import { QrcodeEntity } from '../../qrcode/entities/qrcode.entity';
export declare class ScanEntity {
    id: string;
    qrcode: QrcodeEntity;
    id_qrcode: string;
    ip: string;
    country: string;
    city: string;
    region: string;
    latitude: number | null;
    longitude: number | null;
    create_date: Date;
}
