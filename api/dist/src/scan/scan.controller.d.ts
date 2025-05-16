import { Request, Response } from 'express';
import { ScanService } from './scan.service';
export declare class ScanController {
    private readonly scanService;
    constructor(scanService: ScanService);
    handleScanGet(req: Request, qrId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    handleGpsSave(body: any): Promise<{
        message: string;
        data: import("./entities/scan.entity").ScanEntity;
    }>;
    getAllScans(): Promise<import("./entities/scan.entity").ScanEntity[]>;
    getScanById(id: string): Promise<import("./entities/scan.entity").ScanEntity>;
    findById(id: string): Promise<import("./entities/scan.entity").ScanEntity>;
    deleteScan(id: string): Promise<{
        message: string;
    }>;
}
