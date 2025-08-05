import { Controller, Get, Post, Param, Body, Delete, NotFoundException, UseGuards, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeEntity } from './entities/qrcode.entity';
import { JwtAuthGuard } from 'src/auth/guard/jtw-auth-guard';
import { Request } from '@nestjs/common';
import { Roles } from 'src/auth/decoraters/ roles.decorator';
import { CreateQrcodeDto } from './dto/create-qrcode.dto';
import { Role } from 'src/auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';




@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) { }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER)
  @Post()
  async createQRCode(
    @Request() req,
    @Body() createQrcodeDto: CreateQrcodeDto,
  ): Promise<QrcodeEntity> {
    const id_user = req.user.sub;
    const { number_fone, link_add, name, app_type } = createQrcodeDto;
    return this.qrcodeService.createQRCode(id_user, number_fone, link_add, name, app_type);
  }

  @UseGuards(JwtAuthGuard)
@Roles(Role.OWNER, Role.ADMIN, Role.USER)
@Post('upload-icon')
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './downloads/qrcodImagem',
      filename: (req, file, cb) => {
        const ext = extname(file.originalname);
        const uniqueName = `icon-${Date.now()}${ext}`;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
      }
      cb(null, true);
    },
  }),
)
async uploadIcon(@UploadedFile() file: Express.Multer.File) {
  return {
    message: 'Upload de ícone realizado com sucesso!',
    filename: file.filename,
    path: `/downloads/qrcodImagem/${file.filename}`,
  };
}


  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER, Role.VIWER)
  @Get()
  async findAll(): Promise<QrcodeEntity[]> {
    return this.qrcodeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER, Role.VIWER)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<QrcodeEntity> {
    const qrcode = await this.qrcodeService.findById(id);
    if (!qrcode) {
      throw new NotFoundException(`QRCode com ID ${id} não encontrado.`);
    }
    return qrcode;
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER)
  @Delete(':id')
  async deleteQrcode(@Param('id') id: string) {
    await this.qrcodeService.delete(id);
    return { message: 'QR Code deletado com sucesso', id }; // Ou apenas `res.status(204).send();`
  }


  @Get('whatsapp/:id')
  async openWhatsapp(@Param('id') id: string): Promise<string> {
    const qrcode = await this.qrcodeService.findById(id);
    if (!qrcode) {
      throw new Error('QRCode não encontrado');
    }
    return this.qrcodeService.openWhatsapp(qrcode.number_fone);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.OWNER, Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() createQrcodeDto: CreateQrcodeDto,
  ): Promise<QrcodeEntity> {
    console.log('ID recebido para update:', id);
    console.log('Body recebido:', createQrcodeDto);
    return this.qrcodeService.update(id, createQrcodeDto);
  }

}
