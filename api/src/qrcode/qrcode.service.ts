import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrcodeEntity } from './entities/qrcode.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';

@Injectable()
export class QrcodeService {

  constructor(
    @InjectRepository(QrcodeEntity)
    private readonly qrcodeRepository: Repository<QrcodeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }


  async createQRCode(
    id_user: string,
    number_fone?: string,
    link_add?: string,
    name?: string,
  ): Promise<QrcodeEntity> {

    const uniqueCode = uuidv4();
    // number fone default
    const finalNumber = number_fone ?? '0000000000';
    // se não houver link crie um link do whatsApp com número
    const finalLink = link_add ?? `https://wa.me/${finalNumber}`;

    const backendBaseUrl = process.env.BASE_URL || `https://3f44-2804-16a0-2000-3194-3854-bd3e-277a-ab38.ngrok-free.app`;
    const qrRedirecLink = `${backendBaseUrl}/scan/redirect/${uniqueCode}`;

    //gerar o qrcode em img
    const img = await QRCode.toDataURL(qrRedirecLink, {
      errorCorrectionLevel: 'h',
      type: 'image/png',
      scale: 10,
      margin: 2,
      width: 500,
    });


    const qrcode = this.qrcodeRepository.create({
      id_user,
      code: uniqueCode,
      img: img ?? 'img-indispo.png',
      status: true,
      link_add: finalLink,
      number_fone: finalNumber,
      name: name ?? 'not name',
    });

    return await this.qrcodeRepository.save(qrcode);

  }

  // Método para encontrar um QRCode por ID
  async findById(id: string): Promise<QrcodeEntity | null> {
    return await this.qrcodeRepository.findOne({ where: { id } });
  }

  // qrcode.service.ts
  async findAll(): Promise<QrcodeEntity[]> {
    return await this.qrcodeRepository.find();
  }

  // Método para deletar um QRCode
  async delete(id: string): Promise<string> {
    await this.qrcodeRepository.delete(id);
    return `QRCode com id ${id} deletado com sucesso.`;
  }

  // Método para abrir o WhatsApp com o número de telefone
  openWhatsapp(number_fone: string): string {
    return `https://wa.me/${number_fone}`;
  }

  // Método para ativar o QR Code
  async activateQRCode(id: string): Promise<QrcodeEntity> {
    const qrcode = await this.qrcodeRepository.findOne({ where: { id } });
    if (qrcode) {
      qrcode.status = true;
      return await this.qrcodeRepository.save(qrcode);
    }
    throw new Error('QRCode não encontrado');
  }

  // Método para desativar o QR Code
  async deactivateQRCode(id: string): Promise<QrcodeEntity> {
    const qrcode = await this.qrcodeRepository.findOne({ where: { id } });
    if (qrcode) {
      qrcode.status = false;
      return await this.qrcodeRepository.save(qrcode);
    }
    throw new Error('QRCode não encontrado');
  }

  async update(id: string, createQrcodeDto: CreateQrcodeDto): Promise<QrcodeEntity> {
    const qrcode = await this.qrcodeRepository.findOne({ where: { id } });

    if (!qrcode) {
      throw new NotFoundException(`QR Code com ID ${id} não encontrado.`);
    }

    const updatedQrcode = Object.assign(qrcode, createQrcodeDto);
    console.log('ID recebido para update:', id);
    console.log('Body recebido:', createQrcodeDto);
    return this.qrcodeRepository.save(qrcode);
  }
}
