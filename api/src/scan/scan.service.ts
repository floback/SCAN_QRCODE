// src/scan/scan.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScanEntity } from './entities/scan.entity';
import { QrcodeEntity } from 'src/qrcode/entities/qrcode.entity';
import { ScanDto } from './dto/create-scan.dto';

@Injectable()
export class ScanService {
  constructor(
    @InjectRepository(ScanEntity)
    private readonly scanRepository: Repository<ScanEntity>,
    @InjectRepository(QrcodeEntity)
    private readonly qrcodeRepository: Repository<QrcodeEntity>,
  ) {}

  async createScan(dto: ScanDto): Promise<ScanEntity> {
  const scan = new ScanEntity();

  // associar entidade qrcode com apenas o id
  scan.qrcode = { id: dto.id_qrcode } as QrcodeEntity;

  scan.ip = dto.ip;
  scan.country = dto.country;
  scan.city = dto.city;
  scan.region = dto.region;
  scan.latitude = dto.latitude;
  scan.longitude = dto.longitude;

  return await this.scanRepository.save(scan);
}

  async findByCode(code: string) {
    return this.qrcodeRepository.findOne({ where: { code } });
  }

  async findAll() {
    return await this.scanRepository.find({ order: { create_date: 'DESC' } });
  }

  // find All scan join qrcode
//   async findAllJoin(): Promise<any[]> {
//   return this.scanRepository.find({
//     relations: ["qrcode"],
//     order: { create_date: "DESC" },
//   });
// }
async findAllJoin(): Promise<any[]> {
  return this.scanRepository
    .createQueryBuilder('scan')
    .leftJoinAndSelect('scan.qrcode', 'qrcode')
    .orderBy('scan.create_date', 'DESC')
    .getMany();
}

  async findById(id: string) {
    const scan = await this.scanRepository.findOne({ where: { id } });
    if (!scan) {
      throw new NotFoundException(`Registro de scan com ID ${id} não encontrado.`);
    }
    return scan;
  }

  async delete(id: string) {
    const scan = await this.scanRepository.findOne({ where: { id } });
    if (!scan) {
      throw new NotFoundException(`Registro de scan com ID ${id} não encontrado.`);
    }
    await this.scanRepository.remove(scan);
    return { message: `Registro de scan com ID ${id} deletado com sucesso.` };
  }

  
}
